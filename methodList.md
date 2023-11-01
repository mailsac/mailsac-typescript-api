# `new Mailsac({ headers: { "Mailsac-Key": 'REPLACE_APIKEY_HERE' } })`

## account
### `account.accountStats(params = {})`
### `account.user(params = {})`

## addresses
### `addresses.checkAvailability(email, params = {})`
### `addresses.createAddress(email, data, params = {})`
### `addresses.createAddresses(data, params = {})`
### `addresses.deleteAddress(email, query, params = {})`
### `addresses.getAddress(email, params = {})`
### `addresses.listAddresses(params = {})`
### `addresses.updateAddress(email, data, params = {})`

## attachments
### `attachments.countPublicAttachments(md5Sum, params = {})`
### `attachments.downloadAttachment(email, messageId, attachmentIdentifier, params = {})`
### `attachments.downloadPublicAttachment(md5Sum, params = {})`
### `attachments.listMessageAttachments(email, messageId, params = {})`
### `attachments.listMessagesForAttachment(md5Sum, params = {})`
### `attachments.listPublicAttachments(query, params = {})`

## domains
### `domains.listDomains(params = {})`

## emailValidation
### `emailValidation.validateAddress(email, params = {})`
### `emailValidation.validateAddressesBulk(data, params = {})`

## messageStats
### `messageStats.checkDenylist(domainOrIp, params = {})`
### `messageStats.denylist(params = {})`
### `messageStats.listTopPublicAddresses(query, params = {})`
### `messageStats.listTopPublicDomains(query, params = {})`
### `messageStats.listTopPublicSenders(query, params = {})`

## messages
### `messages.addMessageLabel(email, messageId, label, params = {})`
### `messages.countMessages(email, params = {})`
### `messages.deleteAllDomainMessages(domain, params = {})`
### `messages.deleteAllMessages(email, query, params = {})`
### `messages.deleteMessage(email, messageId, params = {})`
### `messages.deleteMessageLabel(email, messageId, label, params = {})`
### `messages.filterInboxMessages(query, params = {})`
### `messages.getBodyDirty(email, messageId, query, params = {})`
### `messages.getBodyPlainText(email, messageId, query, params = {})`
### `messages.getBodySanitized(email, messageId, query, params = {})`
### `messages.getFullRawMessage(email, messageId, query, params = {})`
### `messages.getHeaders(email, messageId, query, params = {})`
### `messages.getMessageMetadata(email, messageId, params = {})`
### `messages.listDomainMessages(domain, query, params = {})`
### `messages.listInboxMessages(query, params = {})`
### `messages.listMessages(email, query, params = {})`
### `messages.listStarredMessages(params = {})`
### `messages.searchInboxMessages(query, params = {})`
### `messages.setMessageFolder(email, messageId, folder, params = {})`
### `messages.setMessageReadStatus(email, messageId, readBoolean, params = {})`
### `messages.toggleMessageStar(email, messageId, params = {})`

