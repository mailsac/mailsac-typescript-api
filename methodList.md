# `new Mailsac({ headers: { "Mailsac-Key": 'REPLACE_APIKEY_HERE' } })`

## account
### `account.accountStats(params = {})`
### `account.user(params = {})`

## addresses
### `addresses.checkAvailability(email, params = {})`
### `addresses.createAddress(email, data, params = {})`
### `addresses.createAddresses(data, params = {})`
### `addresses.deleteAddress(_a, params)`
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
### `messages.deleteAllMessages(_a, params)`
### `messages.deleteMessage(email, messageId, params = {})`
### `messages.deleteMessageLabel(email, messageId, label, params = {})`
### `messages.filterInboxMessages(query, params = {})`
### `messages.getBodyDirty(_a, params)`
### `messages.getBodyPlainText(_a, params)`
### `messages.getBodySanitized(_a, params)`
### `messages.getFullRawMessage(_a, params)`
### `messages.getHeaders(_a, params)`
### `messages.getMessageMetadata(email, messageId, params = {})`
### `messages.listDomainMessages(_a, params)`
### `messages.listInboxMessages(query, params = {})`
### `messages.listMessages(_a, params)`
### `messages.listStarredMessages(params = {})`
### `messages.searchInboxMessages(query, params = {})`
### `messages.setMessageFolder(email, messageId, folder, params = {})`
### `messages.setMessageReadStatus(email, messageId, readBoolean, params = {})`
### `messages.toggleMessageStar(email, messageId, params = {})`

