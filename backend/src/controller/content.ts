import { Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import ContentModel from "../models/content";
import UserModel from "../models/user";

export const createContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, link, type, tags } = req.body;
    const userId = req.user?.userId;

    const loggedInUser = await UserModel.findById(userId);

    if (!loggedInUser) {
      res.status(401).json({ success: false, message: "You are not authorized!" });
      return;
    }

    const result = await ContentModel.create({ userId, title, link, type, tags });

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

export const getContentBulk = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const results = await ContentModel.find({ userId }).populate("userId", "email username");

    if (results.length === 0) {
      res.status(204).json({ success: false, message: "You don't have any content" });
      return;
    }

    res.status(200).json({ success: true, message: "Content fetched successfully", data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

export const getContentById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    const userId = req.user?.userId;

    const result = await ContentModel.findOne({ _id: contentId, userId });

    if (!result) {
      res.status(404).json({ success: false, message: "Content does not exist" });
      return;
    }

    res.status(200).json({ success: true, message: "Content fetched successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

export const updateContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    const userId = req.user?.userId;

    const result = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId },
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, message: "Content updated successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

export const deleteContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const contentId = req.params.id;
    const userId = req.user?.userId;

    const result = await ContentModel.findOneAndDelete({ _id: contentId, userId });

    res.status(200).json({ success: true, message: "Content deleted successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};
