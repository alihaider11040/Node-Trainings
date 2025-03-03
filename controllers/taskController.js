const taskService = require("../services/task-service").default;

exports.addComment = async (request, res) => {
  try {
    const { taskId } = request.params;
    const { description ,userId} = request.body;

    
    const comment = await taskService.addComment(parseInt(taskId), userId, description);
    return res.status(201).json({ success: true, comment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { description } = req.body;

    const updatedComment = await taskService.updateComment(parseInt(commentId), description);
    return res.json({ success: true, updatedComment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await taskService.deleteComment(parseInt(commentId));
    return res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.addAttachment = async (req, res)=> {
  try {
    const { taskId } = req.params;
    const { userId,file_url, file_name } = req.body;
    const attachment = await taskService.addAttachment(Number(taskId), file_url, file_name);
    res.json({ success: true, attachment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Remove an attachment
exports.removeAttachment= async(req, res) =>{
  try {
    const { attachmentId } = req.params;
    await taskService.deleteAttachment(Number(attachmentId));
    res.json({ success: true, message: "Attachment removed successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
