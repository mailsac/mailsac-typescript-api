"use strict";
/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailsac = exports.HttpClient = exports.ContentType = exports.ByteEncoding = exports.MessageFolder = void 0;
/** Folders for a email messages */
var MessageFolder;
(function (MessageFolder) {
    MessageFolder["Inbox"] = "inbox";
    MessageFolder["All"] = "all";
    MessageFolder["Sent"] = "sent";
    MessageFolder["Spam"] = "spam";
    MessageFolder["Trash"] = "trash";
    MessageFolder["Drafts"] = "drafts";
})(MessageFolder = exports.MessageFolder || (exports.MessageFolder = {}));
var ByteEncoding;
(function (ByteEncoding) {
    ByteEncoding["Byte"] = "byte";
    ByteEncoding["Base64"] = "base64";
})(ByteEncoding = exports.ByteEncoding || (exports.ByteEncoding = {}));
const axios_1 = require("axios");
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor(_a = {}) {
        var { securityWorker, secure, format } = _a, axiosConfig = __rest(_a, ["securityWorker", "secure", "format"]);
        this.securityData = null;
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.request = (_b) => __awaiter(this, void 0, void 0, function* () {
            var { secure, path, type, query, format, body } = _b, params = __rest(_b, ["secure", "path", "type", "query", "format", "body"]);
            const secureParams = ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (yield this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const responseFormat = format || this.format || undefined;
            if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
                body = this.createFormData(body);
            }
            if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
                body = JSON.stringify(body);
            }
            return this.instance.request(Object.assign(Object.assign({}, requestParams), { headers: Object.assign(Object.assign({}, (requestParams.headers || {})), (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), params: query, responseType: responseFormat, data: body, url: path }));
        });
        this.instance = axios_1.default.create(Object.assign(Object.assign({}, axiosConfig), { baseURL: axiosConfig.baseURL || "https://mailsac.com/api" }));
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    mergeRequestParams(params1, params2) {
        const method = params1.method || (params2 && params2.method);
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.instance.defaults), params1), (params2 || {})), { headers: Object.assign(Object.assign(Object.assign({}, ((method && this.instance.defaults.headers[method.toLowerCase()]) || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        }
        else {
            return `${formItem}`;
        }
    }
    createFormData(input) {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [property];
            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
}
exports.HttpClient = HttpClient;
/**
 * @title mailsac API Specification
 * @version 1.0.4
 * @baseUrl https://mailsac.com/api
 *
 * ## About the API
 *
 * The Mailsac API allows for interacting with Mailsac services, including checking email,
 * email validations, setting up forwarding addresses, receiving web socket email messages,
 * and sending outbound mail.
 *
 * [**Get a free API key**](https://mailsac.com/api-keys)
 *
 * Test the Mailsac API online:
 *
 * * [**Swagger UI Explorer** &rarr;](https://mailsac.com/docs/swagger)
 *
 * **Base API Endpoint**:
 *
 * * `https://mailsac.com/api/`
 * * _All API documentation is relative to this endpoint._
 *
 * **OpenAPI Spec**:
 *
 * * [Download JSON](https://mailsac.com/openapi.json)
 * * [Download YAML](https://mailsac.com/openapi.yml)
 *
 *
 * ### Support and Resources
 *
 * * [npm Node.js and Browser library - @mailsac/api](https://www.npmjs.com/package/@mailsac/api)
 * * [Full Documentation and Guides](https://docs.mailsac.com)
 * * [Community Support and Discussion Forums](https://forum.mailsac.com/forums/)
 * * [Web socket example in Node.js - ruffrey](https://github.com/ruffrey/mailsac-node-websocket-example)
 *
 * Paid Email Support, Pre-Sales
 *    > support@team.mailsac.com
 *
 * [Terms of Service](https://docs.mailsac.com/en/latest/about/terms_of_service.html)
 *
 * [Privacy Policy](https://docs.mailsac.com/en/latest/about/privacy_policy.html)
 */
class Mailsac extends HttpClient {
    constructor() {
        super(...arguments);
        this.addresses = {
            /**
             * @description Get an array of enhanced private inbox address objects for the account. These addresses must be setup ("reserved") using `POST /api/addresses/:email`, or [on the Add Email Address page](https://mailsac.com/private-address).
             *
             * @tags Addresses
             * @name ListAddresses
             * @summary List all enhanced email addresses
             * @request GET:/addresses
             * @secure
             */
            listAddresses: (params = {}) => this.request(Object.assign({ path: `/addresses`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @tags Addresses
             * @name GetAddress
             * @summary Fetch an address or check if it is reserved
             * @request GET:/addresses/{email}
             * @secure
             */
            getAddress: (email, params = {}) => this.request(Object.assign({ path: `/addresses/${email}`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Sets the email address private and "owned" by the account. All messages which already exist, and any future messages which are received, will be private to this account only. An email address must be reserved to be able to forward messages to another email address, Slack, web sockets, or webhooks. Public email addresses, and private email addresses under a custom domain, are not routeable.
             *
             * @tags Addresses
             * @name CreateAddress
             * @summary Reserve (create/own) a private email address
             * @request POST:/addresses/{email}
             * @secure
             */
            createAddress: (email, data, params = {}) => this.request(Object.assign({ path: `/addresses/${email}`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description For a private email address, set it to forward to another place. It can be forwarded to another email (with `via mailsac` indicator), to a websocket, to a webhook, or to a Slack channel.
             *
             * @tags Addresses
             * @name UpdateAddress
             * @summary Update private email address forwarding and metadata
             * @request PUT:/addresses/{email}
             * @secure
             */
            updateAddress: (email, data, params = {}) => this.request(Object.assign({ path: `/addresses/${email}`, method: "PUT", body: data, secure: true, type: ContentType.Json }, params)),
            /**
             * @description Removes this enhanced private address from ownership by the account. Any email received to the address's inbox will be public in the future, unless the address was under a custom domain which is set private.
             *
             * @tags Addresses
             * @name DeleteAddress
             * @summary Release an enhanced email address
             * @request DELETE:/addresses/{email}
             * @secure
             */
            deleteAddress: (email, query, params = {}) => this.request(Object.assign({ path: `/addresses/${email}`, method: "DELETE", query: query, secure: true }, params)),
            /**
             * No description
             *
             * @tags Addresses
             * @name CheckAvailability
             * @summary Check address ownership
             * @request GET:/addresses/{email}/availability
             * @secure
             */
            checkAvailability: (email, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/availability`, method: "GET", secure: true }, params)),
            /**
             * @description Reserves multiple enhanced private addresses. The max addresses per request is 100. It is not necessary to create enhanced addresses before receiving email. Enhanced addresses are only necessary to forward messages to another email address, Slack, web sockets, webhooks, or fetch messages over POP3.
             *
             * @tags Addresses
             * @name CreateAddresses
             * @summary Reserve multiple enhanced addresses
             * @request POST:/private-addresses-bulk
             * @secure
             */
            createAddresses: (data, params = {}) => this.request(Object.assign({ path: `/private-addresses-bulk`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
        };
        this.emailValidation = {
            /**
             * @description Determine whether an email address is a valid format, whether it is a disposable address, and the domains or IP addresses it is associated with.
             *
             * @tags emailValidation
             * @name ValidateAddress
             * @summary Validate an email address and if it is disposable
             * @request GET:/validations/addresses/{email}
             * @secure
             */
            validateAddress: (email, params = {}) => this.request(Object.assign({ path: `/validations/addresses/${email}`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Determine whether an email address is a valid format, whether it is a disposable address, and the domains or IP addresses it is associated with.
             *
             * @tags emailValidation
             * @name ValidateAddressesBulk
             * @summary Validate up to 50 email addresses
             * @request POST:/validations/addresses
             * @secure
             */
            validateAddressesBulk: (data, params = {}) => this.request(Object.assign({ path: `/validations/addresses`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
        };
        this.messages = {
            /**
             * @description Get the number of messages for an email inbox address. **It is NOT necessary to reserve the address** before using this route. Whether it is an address on a custom domain, or a public domain, or mailsac.com, the mail can be counted as long as nobody else owns it.
             *
             * @tags Messages
             * @name CountMessages
             * @summary Count messages for an email inbox
             * @request GET:/addresses/{email}/message-count
             * @secure
             */
            countMessages: (email, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/message-count`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Get a list of messages for the email address. Messages are always **sorted in decending order by when they were received**, with the newest message always in the first position of the array. The email message objects are abbreviated to provide basic meta data. To get more information about a specific message, use `GET /api/addresses/{email}/messages/{messageId}`. **It is NOT necessary to reserve the address** before checking mail! Whether it is an address on a custom domain, or a public domain, or mailsac.com, the mail can be checked with this route.
             *
             * @tags Messages
             * @name ListMessages
             * @summary List messages for an email inbox
             * @request GET:/addresses/{email}/messages
             * @secure
             */
            listMessages: (email, query, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description This deletes all messages for a specific email address. The address must be an owned address or an address in a owned domain. Starred messages will not be deleted. Use `DELETE /addresses/{email}/messages/{messageId}` to remove starred messages or unstar the messages before calling this route.
             *
             * @tags Messages
             * @name DeleteAllMessages
             * @summary Delete all messages for an email inbox
             * @request DELETE:/addresses/{email}/messages
             * @secure
             */
            deleteAllMessages: (email, query, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages`, method: "DELETE", query: query, secure: true }, params)),
            /**
             * @description Get a list of messages that have been saved and made private for the entire account using the "star message" feature. Messages recieved via the Capture Service will also show up as starred IF the `capturePrivate` flag on the account is enabled.
             *
             * @tags Messages
             * @name ListStarredMessages
             * @summary List starred (saved) messages on the account
             * @request GET:/addresses/starred/messages
             * @secure
             */
            listStarredMessages: (params = {}) => this.request(Object.assign({ path: `/addresses/starred/messages`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Retrieves metadata about a single email message. This route includes additional metadata not available when listing messages, such as parsed links from the text or HTML body, and attachment md5sums. To get even more information about message attachments, like filenames, see the Attachments API. To get the entire original SMTP message, see the "raw" message route.
             *
             * @tags Messages
             * @name GetMessageMetadata
             * @summary Get email message metadata
             * @request GET:/addresses/{email}/messages/{messageId}
             * @secure
             */
            getMessageMetadata: (email, messageId, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Deletes an individual email message. There is no trash or undo.
             *
             * @tags Messages
             * @name DeleteMessage
             * @summary Delete an email message
             * @request DELETE:/addresses/{email}/messages/{messageId}
             * @secure
             */
            deleteMessage: (email, messageId, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}`, method: "DELETE", secure: true, format: "json" }, params)),
            /**
             * @description Gets the entire original SMTP message transport - everything that was sent over the network to Mailsac's inbound servers, plus any Mailsac-generated `Received` headers, and special `x-mailsac-*` headers.
             *
             * @tags Messages
             * @name GetFullRawMessage
             * @summary Get original SMTP message
             * @request GET:/raw/{email}/{messageId}
             * @secure
             */
            getFullRawMessage: (email, messageId, query, params = {}) => this.request(Object.assign({ path: `/raw/${email}/${messageId}`, method: "GET", query: query, secure: true }, params)),
            /**
             * @description Returns pre-parsed message headers in one of 3 formats - `json`, `json-ordered`, or `plain`. If no querystring parameter is provided, the default format will be `json`. Every email is different; fields in the below examples are not guaranteed to exist.
             *
             * @tags Messages
             * @name GetHeaders
             * @summary Get parsed message headers
             * @request GET:/addresses/{email}/messages/{messageId}/headers
             * @secure
             */
            getHeaders: (email, messageId, query, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/headers`, method: "GET", query: query, secure: true }, params)),
            /**
             * @description Get a message's HTML content. Attached images are inlined and nothing has been stripped. When no HTML body was sent in the original message, a simple HTML body will be created. Use the querystring param ?download=1 to trigger file download in browser.
             *
             * @tags Messages
             * @name GetBodyDirty
             * @summary Get message HTML body (dirty)
             * @request GET:/dirty/{email}/{messageId}
             * @secure
             */
            getBodyDirty: (email, messageId, query, params = {}) => this.request(Object.assign({ path: `/dirty/${email}/${messageId}`, method: "GET", query: query, secure: true }, params)),
            /**
             * @description Get safe HTML from an email message. Scripts, images and links are stripped out. This HTML is safer to render than the potentially "dirty" original HTML. When no HTML body was sent in the original message, a simple HTML body will be created. Use the querystring param ?download=1 to trigger file download in browser.
             *
             * @tags Messages
             * @name GetBodySanitized
             * @summary Get the message HTML body (sanitized)
             * @request GET:/body/{email}/{messageId}
             * @secure
             */
            getBodySanitized: (email, messageId, query, params = {}) => this.request(Object.assign({ path: `/body/${email}/${messageId}`, method: "GET", query: query, secure: true }, params)),
            /**
             * @description Get a message's text content. If the original message only contained HTML, a simple plain text body will be generated. HTTP links in the plain text email will be available when fetching the message's metadata at the `message.links[]` property. Use the querystring param ?download=1 to trigger file download in browser.
             *
             * @tags Messages
             * @name GetBodyPlainText
             * @summary Get message plaintext
             * @request GET:/text/{email}/{messageId}
             * @secure
             */
            getBodyPlainText: (email, messageId, query, params = {}) => this.request(Object.assign({ path: `/text/${email}/${messageId}`, method: "GET", query: query, secure: true }, params)),
            /**
             * @description Toggle a message's *starred* status so it will not be automatically recycled when the account's message storage limit is reached. There is no PUT body. It returns only the message metadata.
             *
             * @tags Messages
             * @name ToggleMessageStar
             * @summary Star (save) a message
             * @request PUT:/addresses/{email}/messages/{messageId}/star
             * @secure
             */
            toggleMessageStar: (email, messageId, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/star`, method: "PUT", secure: true, format: "json" }, params)),
            /**
             * @description To help organize messages and group messages together, add a label to a message. Labels are used in the Inbox UI to group messages. When successful, returns 200 with a subset of the message object. When the label already exists on the message, the message is not modified and the API endpoint returns 200. No PUT body is needed.
             *
             * @tags Messages
             * @name AddMessageLabel
             * @summary Add a label to a message
             * @request PUT:/addresses/{email}/messages/{messageId}/labels/{label}
             * @secure
             */
            addMessageLabel: (email, messageId, label, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/labels/${label}`, method: "PUT", secure: true, format: "json" }, params)),
            /**
             * @description Removes a label from a message. Returns 200 with a subset of the message object when successful. When the label did not exists on the message, the message is not modified and the API endpoint returns 200.
             *
             * @tags Messages
             * @name DeleteMessageLabel
             * @summary Remove a label from a message
             * @request DELETE:/addresses/{email}/messages/{messageId}/labels/{label}
             * @secure
             */
            deleteMessageLabel: (email, messageId, label, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/labels/${label}`, method: "DELETE", secure: true, format: "json" }, params)),
            /**
             * @description Move the message to a different mail folder. No new folders can be added. To organize mail, use labels. No PUT body is needed.
             *
             * @tags Messages
             * @name SetMessageFolder
             * @summary Move a message into a folder
             * @request PUT:/addresses/{email}/messages/{messageId}/folder/{folder}
             * @secure
             */
            setMessageFolder: (email, messageId, folder, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/folder/${folder}`, method: "PUT", secure: true, format: "json" }, params)),
            /**
             * @description Change the read state of a message. Pass `readBoolean` as `true` to mark the message as read, and `false` to mark it as unread. The default for any new message `false` (unread). No PUT body is needed.
             *
             * @tags Messages
             * @name SetMessageReadStatus
             * @summary Set message read/unread status
             * @request PUT:/addresses/{email}/messages/{messageId}/read/{readBoolean}
             * @secure
             */
            setMessageReadStatus: (email, messageId, readBoolean, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/read/${readBoolean}`, method: "PUT", secure: true, format: "json" }, params)),
            /**
             * @description Used by the Inbox UI to display all messages for the account, across all domains and private addresses. Returns email message short metadata, paginated, with the global account unread message count.
             *
             * @tags Messages
             * @name ListInboxMessages
             * @summary Get all account messages paginated
             * @request GET:/inbox
             * @secure
             */
            listInboxMessages: (query, params = {}) => this.request(Object.assign({ path: `/inbox`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Filter account messages within the the `to` and `from` `.address` fields, and the `subject` line. This differs from `/api/inbox-search` by using logical AND, rather than OR in `/api/inbox-search`. At least one query condition is required, otherwise a 400 will be returned. A maximum of 100 results will ever be returned. Refine the query or reduce the number of messages in the account to find specific items.
             *
             * @tags Messages
             * @name FilterInboxMessages
             * @summary Filter messages in account by to, from, and/or subject
             * @request GET:/inbox-filter
             * @secure
             */
            filterInboxMessages: (query, params = {}) => this.request(Object.assign({ path: `/inbox-filter`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Search all account messages within the the `to` and `from` `.address` fields, and the `subject` line. This differs from `/api/inbox-filter` by using logical OR, rather than AND in `/api/inbox-filter`. A maximum of 100 results will ever be returned. Refine the query or reduce the number of messages in the account to find specific items.
             *
             * @tags Messages
             * @name SearchInboxMessages
             * @summary Search messages by to, from, and subject
             * @request GET:/inbox-search
             * @secure
             */
            searchInboxMessages: (query, params = {}) => this.request(Object.assign({ path: `/inbox-search`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Get a list of messages across any inboxes of a domain. Messages are always **sorted in decending order by when they were received**, with the newest message always in the first position of the array. The email message objects are abbreviated to provide basic meta data. To get more information about a specific message, use `GET /api/addresses/{email}/messages/{messageId}`. The domain must be owned by the account making the request, and have DNS validated. Paginate with `until?=<Date>` and `limit=<uint>`.
             *
             * @tags Messages
             * @name ListDomainMessages
             * @summary List messages for an domain
             * @request GET:/domains/{domain}/messages
             * @secure
             */
            listDomainMessages: (domain, query, params = {}) => this.request(Object.assign({ path: `/domains/${domain}/messages`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Delete all messages for a specifc domain. Starred messages will be deleted. The domain must be owned domain.
             *
             * @tags Messages
             * @name DeleteAllDomainMessages
             * @summary Delete all messages in a domain
             * @request POST:/domains/{domain}/delete-all-domain-mail
             * @secure
             */
            deleteAllDomainMessages: (domain, params = {}) => this.request(Object.assign({ path: `/domains/${domain}/delete-all-domain-mail`, method: "POST", secure: true }, params)),
        };
        this.domains = {
            /**
             * @description List custom domains for the account.
             *
             * @tags Domains
             * @name ListDomains
             * @summary List domains
             * @request GET:/domains
             * @secure
             */
            listDomains: (params = {}) => this.request(Object.assign({ path: `/domains`, method: "GET", secure: true, format: "json" }, params)),
        };
        this.account = {
            /**
             * @description Get information about the account for this API key.
             *
             * @tags Account
             * @name User
             * @summary Get current account
             * @request GET:/me
             * @secure
             */
            user: (params = {}) => this.request(Object.assign({ path: `/me`, method: "GET", secure: true }, params)),
            /**
             * @description Get summary information about email addresses, domains, and usage.
             *
             * @tags Account
             * @name AccountStats
             * @summary Get account stats
             * @request GET:/me/stats
             * @secure
             */
            accountStats: (params = {}) => this.request(Object.assign({ path: `/me/stats`, method: "GET", secure: true }, params)),
        };
        this.attachments = {
            /**
             * @description Get attachment metadata on email message.
             *
             * @tags Attachments
             * @name ListMessageAttachments
             * @summary List attachments for an email message
             * @request GET:/addresses/{email}/messages/{messageId}/attachments
             * @secure
             */
            listMessageAttachments: (email, messageId, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/attachments`, method: "GET", secure: true }, params)),
            /**
             * @description Download an email message attachment as a file.
             *
             * @tags Attachments
             * @name DownloadAttachment
             * @summary Download email attachment
             * @request GET:/addresses/{email}/messages/{messageId}/attachments/{attachmentIdentifier}
             * @secure
             */
            downloadAttachment: (email, messageId, attachmentIdentifier, params = {}) => this.request(Object.assign({ path: `/addresses/${email}/messages/${messageId}/attachments/${attachmentIdentifier}`, method: "GET", secure: true }, params)),
            /**
             * @description Search for attachments that were received during the requested time period. Limited to public inboxes and messages not starred by a user. Responds with 'Failed to fetch' in swagger editor. Works in curl with generated example.
             *
             * @tags Attachments
             * @name ListPublicAttachments
             * @summary Search for attachments
             * @request GET:/mailstats/common-attachments
             * @secure
             */
            listPublicAttachments: (query, params = {}) => this.request(Object.assign({ path: `/mailstats/common-attachments`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Provides count of attachments by md5 sum Responds with 'Failed to fetch' in swagger editor, works in curl with generated example
             *
             * @tags Attachments
             * @name CountPublicAttachments
             * @summary Count public attachments
             * @request GET:/mailstats/common-attachments/{md5sum}/count
             * @secure
             */
            countPublicAttachments: (md5Sum, params = {}) => this.request(Object.assign({ path: `/mailstats/common-attachments/${md5Sum}/count`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description List the email messages that have attachments with the requested MD5 sum. Limited to non-private inboxes.
             *
             * @tags Attachments
             * @name ListMessagesForAttachment
             * @summary List public messages with an attachment
             * @request GET:/mailstats/common-attachments/{md5sum}
             * @secure
             */
            listMessagesForAttachment: (md5Sum, params = {}) => this.request(Object.assign({ path: `/mailstats/common-attachments/${md5Sum}`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Download an attachment with the MD5 sum requested.
             *
             * @tags Attachments
             * @name DownloadPublicAttachment
             * @summary Download public attachment
             * @request GET:/mailstats/common-attachments/{md5sum}/download
             * @secure
             */
            downloadPublicAttachment: (md5Sum, params = {}) => this.request(Object.assign({ path: `/mailstats/common-attachments/${md5Sum}/download`, method: "GET", secure: true }, params)),
        };
        this.messageStats = {
            /**
             * No description
             *
             * @tags messageStats
             * @name ListTopPublicAddresses
             * @summary List top public disposable email addresses receiving messages
             * @request GET:/mailstats/top-addresses
             * @secure
             */
            listTopPublicAddresses: (query, params = {}) => this.request(Object.assign({ path: `/mailstats/top-addresses`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @tags messageStats
             * @name ListTopPublicSenders
             * @summary List top sender email addresses for disposable public messages
             * @request GET:/mailstats/top-senders
             * @secure
             */
            listTopPublicSenders: (query, params = {}) => this.request(Object.assign({ path: `/mailstats/top-senders`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @tags messageStats
             * @name ListTopPublicDomains
             * @summary List top public domains receiving disposable messages
             * @request GET:/mailstats/top-domains
             * @secure
             */
            listTopPublicDomains: (query, params = {}) => this.request(Object.assign({ path: `/mailstats/top-domains`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @tags messageStats
             * @name Denylist
             * @summary List the current deny-list
             * @request GET:/mailstats/blacklist
             * @secure
             */
            denylist: (params = {}) => this.request(Object.assign({ path: `/mailstats/blacklist`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Check whether an IP or domain is currently on the deny-list.
             *
             * @tags messageStats
             * @name CheckDenylist
             * @summary Check IP or domain on deny-list
             * @request GET:/mailstats/blacklist/{domainOrIP}
             * @secure
             */
            checkDenylist: (domainOrIp, params = {}) => this.request(Object.assign({ path: `/mailstats/blacklist/${domainOrIp}`, method: "GET", secure: true, format: "json" }, params)),
        };
        this.webSockets = {
            /**
             * @description *Note: this does not work in Swagger UI. Visit https://sock.mailsac.com to test.* You can receive email via web socket for private email addresses and custom domains. To enable web socket forwarding: * Addresses: Select *Edit* for the email address you want to forward. Then check the checkbox for web socket forwarding, and save. * Custom Domains: Select *Manage* for the domain and click the *Forwarding* tab. Toggle the *Enable Web Sockets* option. Note: Web socket forwarding is **not enabled by default.** ### Web Socket Examples #### Web Socket Test Page https://sock.mailsac.com Receive emails in your web browser. Experiment with the web socket gateway in realtime. #### Web Socket Node.js Listen for Mailsac emails via websocket in this tiny Node.js example app. https://github.com/ruffrey/mailsac-node-websocket-example ### Web Socket Connection Endpoint The web socket endpoint is `wss://sock.mailsac.com/incoming-messages` Example: > wss://sock.mailsac.com/incoming-messages?key=k_e9bPnd2adexample&addresses=jeff@mailsac.com,asdf-outbound.mailsac.com > First frame: ``` { "status": 200, "msg": "Listening", "addresses": [ "jeff@mailsac.com" ], "domains": [ "asdf-outbound.mailsac.com" ] } ``` All web socket messages are JSON. After parsing the JSON, there will be a status field with an HTTP status code (usually 200). An email coming over the web socket will also have an email property, and its value will be the same as the messages REST API, plus some additional fields.
             *
             * @tags Web Sockets
             * @name DoNotUseWebSocketDocsOnly
             * @summary Connect a web socket to wss://sock.mailsac.com/incoming-messages
             * @request POST:/custom_web_sockets
             */
            doNotUseWebSocketDocsOnly: (query, params = {}) => this.request(Object.assign({ path: `/custom_web_sockets`, method: "POST", query: query }, params)),
        };
        this.webhooks = {
            /**
             * @description *Note: this does not work in Swagger UI.* Webhook Forwarding is one of several options available for enhanced addresses and custom domains (via catch-all addresses enabled under a custom domain). Forwarding to a Webhook can be configured by selecting Manage Email Addresses from the Dashboard. Select the Settings button next to the email address to manage, then input the URL under Forward To Custom Webhook and select Save Settings. Troubleshoot webhooks using your account *Audit Logs*.
             *
             * @tags Webhooks
             * @name DoNotUseWebhookDocsOnly
             * @summary Receive a webhook email message on your server
             * @request POST:/custom_webhooks
             */
            doNotUseWebhookDocsOnly: (params = {}) => this.request(Object.assign({ path: `/custom_webhooks`, method: "POST" }, params)),
        };
    }
}
exports.Mailsac = Mailsac;
