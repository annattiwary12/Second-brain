// src/controllers/share.ts

import { Response, Request } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { genHash } from "../config/utils";
import ShareBrainModel from "../models/shareBrain";
import ContentModel from "../models/content";

// 🔧 Add return type Promise<void>
export const shareBrain = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { share } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const shareLinkExist = await ShareBrainModel.findOne({ userId });

    if (!share && shareLinkExist) {
      await ShareBrainModel.deleteOne({ userId });
      res.status(200).json({
        success: true,
        message: "Share URL deleted successfully",
      });
      return;
    }

    if (share && !shareLinkExist) {
      const hash = genHash(10);
      const result = await ShareBrainModel.create({ hash, userId });

      res.status(201).json({
        success: true,
        message: "Share URL created successfully",
        data: result,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Share link already exists",
      data: shareLinkExist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// 🔧 Also here: Promise<void>
export const fetchSharedBrain = async (req: Request, res: Response): Promise<void> => {
  try {
    const hash = req.params.hash;

    const brain = await ShareBrainModel.findOne({ hash });

    if (!brain) {
      res.status(404).json({
        success: false,
        message: "Shared URL does not exist",
      });
      return;
    }

    const content = await ContentModel.find({ userId: brain.userId }).populate(
      "userId",
      "username"
    );

    res.status(200).json({
      success: true,
      message: "Fetched content successfully!",
      data: content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};
