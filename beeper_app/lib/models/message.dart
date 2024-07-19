class Message {
  final String id;
  final String content;
  final String senderId;
  final String recipientId;
  final String groupId;
  final DateTime timestamp;
  final bool readStatus;

  Message({
    required this.id,
    required this.content,
    required this.senderId,
    required this.recipientId,
    required this.groupId,
    required this.timestamp,
    required this.readStatus,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['_id'],
      content: json['content'],
      senderId: json['senderId'],
      recipientId: json['recipientId'] ?? '',
      groupId: json['groupId'] ?? '',
      timestamp: DateTime.parse(json['timestamp']),
      readStatus: json['readStatus'],
    );
  }
}
