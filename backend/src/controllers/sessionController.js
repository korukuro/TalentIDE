import Session from "../models/Session.js";
import { streamClient, chatClient } from "../lib/stream.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    //generate unique call id for stream video call
    const callId = `seassion_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    //create session in database
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    //chat messaging
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    res
      .status(201)
      .json({
        message: "Session created successfully",
        sessionId: session._id,
      });
  } catch (error) {
    console.log("Error creating session:", error);
    res.status(500).json({ message: "Error creating session" });
  }
}

export async function getActiveSessions(req, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
   
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error fetching active session:", error);
    res.status(500).json({ message: "Error fetching active session" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;
    //where user is either host or participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error fetching recent sessions:", error);
    res.status(500).json({ message: "Error fetching recent sessions" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name profileImage email clerkId")
      .populate("participants", "name profileImage email clerkId");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ session });
  } catch (error) {
    console.log("Error fetching session by id:", error);
    res.status(500).json({ message: "Error fetching session by id" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params; //is this session id of host or participant? answer: this is session id of the session document in database which we can use to fetch callId for stream video call and also to update participant field in session document in database
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if(session.status !== "active"){
        return res.status(404).json({ message: "No active sessions found" });
    }

    if(session.host._id.toString() === req.user._id.toString()){
        return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }
    //check if session is already full
    if (session.participant)
      return res.status(409).json({ message: "Session is full" });

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId); //callid kese participant ko milega? answer: callid is generated when session is created and stored in session document in database so we can fetch it using session.callId
    await channel.addMembers([clerkId]);

    res.status(200).json({ message: "Joined session successfully" });
  } catch (error) {
    console.log("Error joining session:", error);
    res.status(500).json({ message: "Error joining session" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    //check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only host can end the session" });
    }

    //check if session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    //delete stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //delete chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();
    
    res.status(200).json({ message: "Session ended successfully" });
  } catch (error) {
    console.log("Error ending session:", error);
    res.status(500).json({ message: "Error ending session" });
  }
}
