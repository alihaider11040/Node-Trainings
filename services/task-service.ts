import Task from "../models/task";
import User from "../models/user";
import Assignment from "../models/assignment";
import TaskComment from "../models/comment";
import Attachment from "../models/fileAttachment";
import { ICommentInstance, ITaskInstance } from "../types/models";

class TaskService {

  // Add a comment to a task
  async addComment(taskId: number, userId: number, description: string) {
    return await TaskComment.create({ taskId, userId, description });
  }

  // Update a comment
  async updateComment(commentId: number, description: string) {
    const comment = await TaskComment.findByPk(commentId) as ICommentInstance | null;
    if (!comment) throw new Error("Comment not found");

    comment.description = description;
    await comment.save();
    return comment;
  }

  // Delete a comment
  async deleteComment(commentId: number) {
    const comment = await TaskComment.findByPk(commentId);
    if (!comment) throw new Error("Comment not found");

    await comment.destroy();
  }

  // Add an attachment to a task
  async addAttachment(taskId: number, userId: number, filePath: string) {
    return await Attachment.create({ taskId, userId, filePath });
  }

  // Delete an attachment
  async deleteAttachment(attachmentId: number) {
    const attachment = await Attachment.findByPk(attachmentId);
    if (!attachment) throw new Error("Attachment not found");

    await attachment.destroy();
  }
}

export default new TaskService();
