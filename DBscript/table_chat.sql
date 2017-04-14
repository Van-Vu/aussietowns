DROP TABLE IF EXISTS conversation_reply;
CREATE TABLE conversation_reply (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	messageContent text,
	userId int(11) NOT NULL,
	time DATETIME NOT NULL,
	conversationId int(11) NOT NULL,
	FOREIGN KEY (userId) REFERENCES user(id),
	FOREIGN KEY (conversationId) REFERENCES conversation(id)
);

DROP TABLE IF EXISTS conversation;
CREATE TABLE conversation (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	userOne int(11) NOT NULL,
	userTwo int(11) NOT NULL,
	lastMessageTime DATETIME NOT NULL,
	FOREIGN KEY (userOne) REFERENCES user(id),
	FOREIGN KEY (userTwo) REFERENCES user(id)
);