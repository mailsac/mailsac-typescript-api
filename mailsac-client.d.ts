export interface ErrorResponseBody {
    message?: string;
    error?: string;
    validationErrors?: string[];
}
export interface NotEnoughCreditsResponse {
    /** @example "You must purchase more outgoing messages before you can send" */
    message?: string;
}
export interface TooManyRecipientsResponse {
    /** @example "The to field exceeds the maximum allowed size" */
    message?: string;
}
/**
 * domain
 * @example "example.msdc.co"
 */
export type DomainString = string;
/**
 * email address
 * @format email
 * @example "anything_123@mailsac.com"
 */
export type EmailString = string;
/**
 * email addresses
 * @format array
 * @example ["anything-123@mailsac.com","anything-456@example.com"]
 */
export type EmailStringList = EmailString[];
export interface EmailAddress {
    /**
     * the unique identifier of this email address is the email address itself
     * @format email
     */
    _id?: string;
    /** Allows setting custom information about this email address. */
    info?: string;
    /** boolean defaulting false indicating whether to publish messages via web socket when the user owning this inbox is subscribed */
    enabledws?: boolean;
    /**
     * email address where messages to this inbox will be forwarded
     * @format email
     */
    forward?: string;
    /**
     * URL where messages to this inbox will be forwarded
     * @format url
     */
    webhook?: string;
    /**
     * Slack webhook endpoint where messages should be published
     * @format url
     */
    webhookSlack?: string;
    /** When webhookSlack is set, controls whether the message includes TO and FROM */
    webhookSlackToFrom?: boolean;
    /** Account that owns the address (owns the privacy) */
    owner?: string;
    /**
     * An alternate email address that will result in the message being delivered to this inbox. This is not always present.
     * @format email
     * @example "inbox-cf5abefaf492601c5fe0a1563c00b76816145206@mailsac.com"
     */
    encryptedInbox?: string;
    /**
     * Indicates whether this is a catch-all address, and for which domain.
     * @format domain
     */
    catchAll?: string;
    /**
     * When the user owns the domain but has not reserved the address individually, this field is set to true.
     * @default false
     */
    implicit?: boolean;
    /** @format date-time */
    created?: string;
    /** @format date-time */
    updated?: string;
}
/**
 * email addresses
 * @format array
 */
export type EmailAddressList = EmailAddress[];
export interface EmailMessage {
    /** Unique Mailsac-generated identifier for an email message */
    _id?: MessageId;
    /** The FROM sender, this will always have 1 item in the array unless the email was malformed. */
    from?: EmailRecipient[];
    /** The RCPT-TO recipients of the email. */
    to?: EmailRecipient[];
    /** CarbonCopy recipients of the email. */
    cc?: EmailRecipient[];
    /** BlindCarbonCopy recipients of the email. */
    bcc?: EmailRecipient[];
    /** Email subject header line. Can be an empty string. */
    subject?: EmailSubject;
    /** Indicates a starred message by your account Account._id. Otherwise `null`. */
    savedBy?: string;
    /** Same as inbox unless sent to the encryptedInbox, in which case it would be the encryptedInbox. */
    originalInbox?: string;
    /**
     * Email address to which this message belongs.
     * @format email
     */
    inbox?: string;
    /**
     * hostname domain for the inbox
     * @format domain
     * @example "example.com"
     */
    domain?: string;
    /** Date in ISO 8601 */
    received?: Date;
    /** Content length in bytes of the original raw email message */
    size?: number;
    /** `null` or array of MD5 hashes of attachments. Use the Attachments API to get metadata and download attachments. */
    attachments?: Md5Sum[];
    /** The remote SMTP server that send the mail to the server at `via` */
    ip?: string;
    /** IP address of SMTP server that received the message from `ip` */
    via?: string;
    /**
     * Inbox folder that this message has been put into
     * @default "inbox"
     */
    folder?: "inbox" | "all" | "sent" | "spam" | "trash";
    /** Custom inbox labels created by the end user */
    labels?: string[];
    /** Read/uread status. true=read, false=unread. Only set from the Inbox UI app. */
    read?: boolean;
    /** When true, indicates the SMTP message was received over TLS (encrypted). */
    rtls?: boolean;
    /** List of any URLs that were found in the text and HTML body of the message. */
    links?: string[];
    /**
     * Experimental - result of spam filter scan, between 0.0 and 1.0, where 1.0 indicates a high likelihood of being spam
     * @example 0.345
     */
    spam?: number;
}
export interface EmailMessageBodyProps {
    /** Plain text email body */
    text?: string;
    /** HTML email body */
    body?: string;
    /** Entire SMTP original message including headers and attachments */
    raw?: string;
    /** Key-value pairs of headers where the value is an array of strings */
    headers?: object;
}
/** Entire email message plus parsed body and raw SMTP */
export interface EmailMessageWebSocketFrame {
    /** @example 200 */
    status?: number;
    email?: EmailMessageBodyProps & EmailMessage;
}
export type EmailMessageWebhook = EmailMessageBodyProps & EmailMessage;
/** List of full email message objects */
export type EmailMessageList = EmailMessage[];
/** List of condensed email message objects */
export type EmailMessageListShort = EmailMessageShort[];
export interface EmailMessageShort {
    inbox?: any;
    to?: any;
    from?: any;
    subject?: any;
    originalInbox?: any;
    size?: any;
    attachments?: any;
    received?: any;
    bcc?: any;
    cc?: any;
    domain?: any;
    folder?: any;
    ip?: any;
    labels?: any;
    links?: any;
    read?: any;
    rtls?: any;
    savedBy?: any;
    spam?: any;
    via?: any;
}
/** List of custom domain objects */
export type DomainsList = Domain[];
/** Custom domain */
export interface Domain {
    /**
     * domain
     * @format domain
     */
    _id?: string;
    /**
     * Date domain was created
     * @format date-time
     */
    created?: string;
    /**
     * Date domain settings were last updated
     * @format date-time
     */
    updated?: string;
    /**
     * boolean defaulting false indicating whether to publish messages via
     * web socket to any subscribed web socket sessions
     */
    enablews?: boolean;
    /** boolean defaulting false indicating whether this is managed by mailsac (on msdc.co) */
    hosted?: boolean;
    /**
     * boolean defaulting false indicating whether this is the default
     * domain for the account which will show in the sidebar first
     */
    isDefault?: boolean;
    /** boolean defaulting true indicating whether inboxes and messages for this domain will be visible publicly */
    isPrivate?: boolean;
    /** during custom domain verification, this field indicates dns issues */
    lastVerificationErrors?: string;
    /** the account to which this domain is assigned and can be managed */
    owner?: string;
    /** during custom domain verification, this field indicates value of a TXT record that must be added to the domain's DNS settings */
    verificationTxt?: string;
    /** boolean defaulting false indicating whether this domain has been verified via dns TXT record verificationTxt */
    verified?: boolean;
    /** boolean defaulting false indicating whether the domain will receive email successfully at Mailsac. Tthis domain has been verified via dns MX records when true. */
    verifiedMx?: boolean;
}
export interface EmailRecipient {
    /** friendly email name, optional part of transport so may be empty string */
    name?: string;
    /** email address */
    address?: string;
}
/** body object to update address forwarding */
export interface UpdatePrivateAddressForwarding {
    /** User configurable metadata about this enhanced private address. */
    info?: string;
    /**
     * email address - SMTP forwarding / standard email forwarding - set to "" or null to disable forwarding
     * @default ""
     */
    forward?: string;
    /**
     * boolean, defaults false - set to true to enable web socket forwarding (see Web Socket API)
     * @default false
     */
    enablews?: boolean;
    /**
     * url - set to your public webhook endpoint to receive mail via webhook - set to "" or null to disable webhooks
     * @default ""
     */
    webhook?: string;
    /**
     * Slack webhook URL where messages will be published.
     * @default ""
     */
    webhookSlack?: string;
    /** When webhookSlack is set, controls whether the message includes TO and FROM */
    webhookSlackToFrom?: boolean;
}
export interface EmailAddressIntegrity {
    /**
     * Full email address that was checked.
     * @format email
     * @example "billy.wilson@example.com"
     */
    email: string;
    /** Indicates if the format is valid. */
    validFormat: boolean;
    /**
     * The "local part" of the email address, before the @ symbol.
     * @example "billy.wilson"
     */
    local?: string;
    /**
     * The domain of the email address which was used for evaluating disposable components, after the @ symbol.
     * @format domain
     * @example "example.com"
     */
    domain?: string;
    /** Boolean indicating if this email address is known to resolve to disposable email providers, most likely making it not useful for marketing mailing lists or signups. */
    isDisposable?: boolean;
    /**
     * Array of string domains where this email resolves to, which is helpful when the domain is custom, but receives its mail at a disposable email provider.
     * @format domain
     * @example ["example.com","others.org"]
     */
    disposableDomains?: string[];
    /**
     * Array of string domains and IP addresses which are associated with the domain for this email address.
     * @example ["example.com","192.168.0.1","example.io"]
     */
    aliases?: string[];
}
/** Email subject header line. Can be an empty string. */
export type EmailSubject = string;
export type EmailAddressIntegrityList = EmailAddressIntegrity[];
/** Returns object showing email address availability */
export interface EmailAddressAvailability {
    /** Indicates if the address is available to be reserved */
    available?: boolean;
    /**
     * email address
     * @format email
     */
    email?: string;
    /** Indicates if the address is owned by an account, but not by whom. */
    owned?: boolean;
}
/**
 * Unique Mailsac-generated identifier for an email message
 * @format string
 * @example "m3phnJ2ag3example-0"
 */
export type MessageId = string;
/**
 * Date in ISO 8601
 * @format date
 * @example "1985-04-12T23:20:50.52Z"
 */
export type Date = string;
/** Label for email message */
export type MessageLabel = string;
/** Labels for an email message */
export type MessageLabels = MessageLabel[];
/** Folders for a email messages */
export declare enum MessageFolder {
    Inbox = "inbox",
    All = "all",
    Sent = "sent",
    Spam = "spam",
    Trash = "trash",
    Drafts = "drafts"
}
/** True to mark message as read, False to mark message unread. Default False */
export type ReadBoolean = boolean;
/** SMTP headers are returned as json with header values grouped. */
export type MessageHeaders = Record<string, string[]> | Record<string, {
    name?: string;
    value?: string;
}>;
/** Email attachment object */
export interface EmailAttachment {
    /** contentid */
    cid?: string;
    contentDisposition?: string;
    encoding?: ByteEncoding;
    filename?: string;
}
/** Array of Email Attachment Objects */
export type EmailAttachmentList = EmailAttachment[];
export declare enum ByteEncoding {
    Byte = "byte",
    Base64 = "base64"
}
/** JSON formatted email message used for sending */
export interface SendMessage {
    /** To addresses for SendMessage Object */
    to: SendMessageTo;
    /** To addresses for SendMessage Object */
    from: SendMessageFrom;
    /** Email subject header line. Can be an empty string. */
    subject: EmailSubject;
    /** plaintext email contents */
    text: string;
    /** html email contents */
    html: string;
    /** Array of Email Attachment Objects */
    attachments?: EmailAttachmentList;
    received?: ReceivedHeadersList[];
    /** raw SMTP messsage overrides all other properties */
    raw?: string;
}
/** SMTP Received headers */
export type ReceivedHeaders = string;
/** Array of strings of current and possibly previous received headers */
export type ReceivedHeadersList = ReceivedHeaders[];
/** To addresses for SendMessage Object */
export type SendMessageTo = EmailString | EmailStringList;
/** To addresses for SendMessage Object */
export type SendMessageFrom = EmailString | EmailStringList;
/** Information regarding the current user */
export interface CurrentUserInfo {
    /**
     * username
     * @example "my_username"
     */
    _id?: string;
    /** email address */
    email?: EmailString;
    /** email address */
    invoiceEmail?: EmailString;
    /** Setting which will apply a star to all captured emails. */
    capturePrivate?: boolean;
    /**
     * Maximum allowed message history (starred messages + all messages on enhanced addresses and domains)
     * @example 1000
     */
    messageLimit?: number;
    /**
     * Number of outbound recipients left to be able to send a message to
     * @example 8181
     */
    sendsRemaining?: number;
    /** Number of custom domain that the account is entitled to but has not yet reserved */
    privateDomain?: number;
    /**
     * Number of enhanced addresses that the account is entitled to but has not yet reserved
     * @example 100
     */
    privateAddressCredits?: number;
    /** Flag indicating whether account is allowed to request adding IPs to the global allow-list. */
    whitelistAccess?: 0 | 1;
    /** Approximate number of total API calls made by the account this month */
    moAPICount?: number;
    /** Number of API calls allowed monthly */
    apiMonthlyLimit?: number;
    /** When present, indicates the account has past-due invoices and service is disabled */
    billingHold?: string;
    /** When present, indicates a disabled account */
    disabled?: string;
    /** The most recent email addresses viewed by this account in the UI */
    recents?: EmailString[];
    /** Inbox labels created by the account */
    labels?: string[];
    /** Company name associated with account */
    company?: string;
    /** Company address associated with account */
    address?: string;
    /** Entitlement flag indicating whether the account has access to the Firehose Web Socket API */
    firehose?: number;
    /** Entitlement flag indicating whether the account has access to Public Domains */
    allowPublicDomains?: 0 | 1;
    /** Flag indicating whether account is allowed to view analytics */
    viewAnalytics?: 0 | 1;
    /** Flag indicating whether account has access to API */
    apiAccess?: 0 | 1;
    wsDomain?: 0 | 1;
    manyKeys?: 0 | 1;
    internalUnlimited?: 0 | 1;
    totalSent?: number;
    /** Date in ISO 8601 */
    lastLogin?: Date;
    allowMultipleUsers?: 0 | 1;
    /** Number of users  */
    userLimit?: number;
    disableSpam?: boolean;
    stripeId?: string;
    moAPIDisabled?: number;
    moAPILimitWarningEmail?: number;
    apiKeyName?: string;
}
/** Describes current user stats */
export interface CurrentUserStats {
    /** List of owned email addresses */
    addresses?: EmailString[];
    /** List of custom domains */
    domains?: string[];
    /**
     * Total count of saved messages
     * @min 0
     * @example 100
     */
    starredMessages?: number;
    /**
     * Total messages on all enhanced addresses and custom domains
     * @min 0
     * @example 100
     */
    storedMessages?: number;
    /**
     * Sum size of all messages on enhanced addresses and custom domains
     * @min 0
     * @example 1024
     */
    inboxBytes?: number;
    /**
     * Count of all outgoing messages ever sent
     * @min 0
     * @example 100
     */
    totalSent?: number;
    /** Count of paid ops performed in the previous month */
    lastMonthOps?: number;
    /** Domain set to default */
    defaultDomain?: string;
}
/** Describes metadata for attachment */
export interface AttachmentMeta {
    /** md5 checksum on attachment file */
    checksum?: Md5Sum;
    /** TODO: describe */
    contentDisposition?: string;
    /** Unique identifier for message attachment. Can be the md5sum, smtp content-id (cid), or filename. */
    contentId?: AttachmentIdentifier;
    /**
     * Content type of the attachment
     * @example "application/PDF"
     */
    contentType?: string;
    /**
     * Filename of attachment
     * @example "w2.pdf"
     */
    fileName?: string;
    /**
     * length of attachment
     * @min 0
     * @example 42532
     */
    length?: number;
    /**
     * Encoding used for attachment
     * @example "base64"
     */
    transferEncoding?: string;
}
/**
 * Unique identifier for message attachment. Can be the md5sum, smtp content-id (cid), or filename.
 * @example "5ea9c924627e68f988c9c7ca44340892 || foo4*foo1@bar.net || horse.png"
 */
export type AttachmentIdentifier = string;
/** Common attachments received */
export interface CommonAttachments {
    /** md5 checksum on attachment file */
    _id?: Md5Sum;
    /** Count of public messages with this attachment */
    n?: number;
}
/**
 * md5 checksum on attachment file
 * @format md5sum
 * @example "5ea9c924627e68f988c9c7ca44340892"
 */
export type Md5Sum = string;
/**
 * How many items to skip (like paging)
 * @min 0
 * @default 0
 */
export type Skip = number;
/**
 * Limit results to this many
 * @min 0
 * @max 1000
 * @default 20
 */
export type Limit = number;
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
    protected stringifyFormItem(formItem: unknown): string;
    protected createFormData(input: Record<string, unknown>): FormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T, any>>;
}
/**
 * @title mailsac API Specification
 * @version 1.0.6
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
export declare class Mailsac<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    addresses: {
        /**
         * @description Get an array of enhanced private inbox address objects for the account. These addresses must be setup ("reserved") using `POST /api/addresses/:email`, or [on the Add Email Address page](https://mailsac.com/private-address).
         *
         * @tags Addresses
         * @name ListAddresses
         * @summary List all enhanced email addresses
         * @request GET:/addresses
         * @secure
         */
        listAddresses: (params?: RequestParams) => Promise<AxiosResponse<EmailAddressList, any>>;
        /**
         * No description
         *
         * @tags Addresses
         * @name GetAddress
         * @summary Fetch an address or check if it is reserved
         * @request GET:/addresses/{email}
         * @secure
         */
        getAddress: (email: EmailString, params?: RequestParams) => Promise<AxiosResponse<EmailAddress, any>>;
        /**
         * @description Sets the email address private and "owned" by the account. All messages which already exist, and any future messages which are received, will be private to this account only. An email address must be reserved to be able to forward messages to another email address, Slack, web sockets, or webhooks. Public email addresses, and private email addresses under a custom domain, are not routeable.
         *
         * @tags Addresses
         * @name CreateAddress
         * @summary Reserve (create/own) a private email address
         * @request POST:/addresses/{email}
         * @secure
         */
        createAddress: (email: EmailString, data?: UpdatePrivateAddressForwarding, params?: RequestParams) => Promise<AxiosResponse<EmailAddress, any>>;
        /**
         * @description For a private email address, set it to forward to another place. It can be forwarded to another email (with `via mailsac` indicator), to a websocket, to a webhook, or to a Slack channel.
         *
         * @tags Addresses
         * @name UpdateAddress
         * @summary Update private email address forwarding and metadata
         * @request PUT:/addresses/{email}
         * @secure
         */
        updateAddress: (email: EmailString, data: UpdatePrivateAddressForwarding, params?: RequestParams) => Promise<AxiosResponse<void, any>>;
        /**
         * @description Removes this enhanced private address from ownership by the account. Any email received to the address's inbox will be public in the future, unless the address was under a custom domain which is set private.
         *
         * @tags Addresses
         * @name DeleteAddress
         * @summary Release an enhanced email address
         * @request DELETE:/addresses/{email}
         * @secure
         */
        deleteAddress: (email: EmailString, query?: {
            deleteAddressMessages?: boolean;
        }, params?: RequestParams) => Promise<AxiosResponse<void, any>>;
        /**
         * No description
         *
         * @tags Addresses
         * @name CheckAvailability
         * @summary Check address ownership
         * @request GET:/addresses/{email}/availability
         * @secure
         */
        checkAvailability: (email: EmailString, params?: RequestParams) => Promise<AxiosResponse<EmailAddressAvailability, any>>;
        /**
         * @description Reserves multiple enhanced private addresses. The max addresses per request is 100. It is not necessary to create enhanced addresses before receiving email. Enhanced addresses are only necessary to forward messages to another email address, Slack, web sockets, webhooks, or fetch messages over POP3.
         *
         * @tags Addresses
         * @name CreateAddresses
         * @summary Reserve multiple enhanced addresses
         * @request POST:/private-addresses-bulk
         * @secure
         */
        createAddresses: (data: {
            /** email addresses */
            addresses?: EmailStringList;
        }, params?: RequestParams) => Promise<AxiosResponse<EmailAddressList, any>>;
    };
    emailValidation: {
        /**
         * @description Determine whether an email address is a valid format, whether it is a disposable address, and the domains or IP addresses it is associated with.
         *
         * @tags emailValidation
         * @name ValidateAddress
         * @summary Validate an email address and if it is disposable
         * @request GET:/validations/addresses/{email}
         * @secure
         */
        validateAddress: (email: EmailString, params?: RequestParams) => Promise<AxiosResponse<EmailAddressIntegrity, any>>;
        /**
         * @description Determine whether an email address is a valid format, whether it is a disposable address, and the domains or IP addresses it is associated with.
         *
         * @tags emailValidation
         * @name ValidateAddressesBulk
         * @summary Validate up to 50 email addresses
         * @request POST:/validations/addresses
         * @secure
         */
        validateAddressesBulk: (data: {
            /** email addresses */
            emails?: EmailStringList;
        }, params?: RequestParams) => Promise<AxiosResponse<EmailAddressIntegrityList, any>>;
    };
    messages: {
        /**
         * @description Get the number of messages for an email inbox address. **It is NOT necessary to reserve the address** before using this route. Whether it is an address on a custom domain, or a public domain, or mailsac.com, the mail can be counted as long as nobody else owns it.
         *
         * @tags Messages
         * @name CountMessages
         * @summary Count messages for an email inbox
         * @request GET:/addresses/{email}/message-count
         * @secure
         */
        countMessages: (email: EmailString, params?: RequestParams) => Promise<AxiosResponse<{
            /** @example 3 */
            count?: number;
            /** @example "example@mailsac.com" */
            inbox?: string;
        }, any>>;
        /**
         * @description Get a list of messages for the email address. Messages are always **sorted in decending order by when they were received**, with the newest message always in the first position of the array. The email message objects are abbreviated to provide basic meta data. To get more information about a specific message, use `GET /api/addresses/{email}/messages/{messageId}`. **It is NOT necessary to reserve the address** before checking mail! Whether it is an address on a custom domain, or a public domain, or mailsac.com, the mail can be checked with this route.
         *
         * @tags Messages
         * @name ListMessages
         * @summary List messages for an email inbox
         * @request GET:/addresses/{email}/messages
         * @secure
         */
        listMessages: (email: EmailString, query?: {
            /** Return messages returned up to this UTC date */
            until?: Date;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<EmailMessageList, any>>;
        /**
         * @description This deletes all messages for a specific email address. The address must be an owned address or an address in a owned domain. Starred messages will not be deleted. Use `DELETE /addresses/{email}/messages/{messageId}` to remove starred messages or unstar the messages before calling this route.
         *
         * @tags Messages
         * @name DeleteAllMessages
         * @summary Delete all messages for an email inbox
         * @request DELETE:/addresses/{email}/messages
         * @secure
         */
        deleteAllMessages: (email: EmailString, query?: {
            /** Return messages returned up to this UTC date */
            until?: Date;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<void, any>>;
        /**
         * @description Get a list of messages that have been saved and made private for the entire account using the "star message" feature. Messages recieved via the Capture Service will also show up as starred IF the `capturePrivate` flag on the account is enabled.
         *
         * @tags Messages
         * @name ListStarredMessages
         * @summary List starred (saved) messages on the account
         * @request GET:/addresses/starred/messages
         * @secure
         */
        listStarredMessages: (params?: RequestParams) => Promise<AxiosResponse<EmailMessageList, any>>;
        /**
         * @description Retrieves metadata about a single email message. This route includes additional metadata not available when listing messages, such as parsed links from the text or HTML body, and attachment md5sums. To get even more information about message attachments, like filenames, see the Attachments API. To get the entire original SMTP message, see the "raw" message route.
         *
         * @tags Messages
         * @name GetMessageMetadata
         * @summary Get email message metadata
         * @request GET:/addresses/{email}/messages/{messageId}
         * @secure
         */
        getMessageMetadata: (email: EmailString, messageId: MessageId, params?: RequestParams) => Promise<AxiosResponse<EmailMessage, any>>;
        /**
         * @description Deletes an individual email message. There is no trash or undo.
         *
         * @tags Messages
         * @name DeleteMessage
         * @summary Delete an email message
         * @request DELETE:/addresses/{email}/messages/{messageId}
         * @secure
         */
        deleteMessage: (email: EmailString, messageId: MessageId, params?: RequestParams) => Promise<AxiosResponse<{
            /** Unique Mailsac-generated identifier for an email message */
            _id?: MessageId;
            /** email address */
            inbox?: EmailString;
            /** @example "Message was deleted." */
            message?: string;
        }, any>>;
        /**
         * @description Gets the entire original SMTP message transport - everything that was sent over the network to Mailsac's inbound servers, plus any Mailsac-generated `Received` headers, and special `x-mailsac-*` headers.
         *
         * @tags Messages
         * @name GetFullRawMessage
         * @summary Get original SMTP message
         * @request GET:/raw/{email}/{messageId}
         * @secure
         */
        getFullRawMessage: (email: EmailString, messageId: MessageId, query?: {
            /** Download to browser */
            download?: 1;
        }, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * @description Returns pre-parsed message headers in one of 3 formats - `json`, `json-ordered`, or `plain`. If no querystring parameter is provided, the default format will be `json`. Every email is different; fields in the below examples are not guaranteed to exist.
         *
         * @tags Messages
         * @name GetHeaders
         * @summary Get parsed message headers
         * @request GET:/addresses/{email}/messages/{messageId}/headers
         * @secure
         */
        getHeaders: (email: EmailString, messageId: MessageId, query?: {
            /** Download to browser */
            download?: 1;
            messageHeadersFormat?: "json" | "json-ordered" | "plain";
        }, params?: RequestParams) => Promise<AxiosResponse<MessageHeaders, any>>;
        /**
         * @description Get a message's HTML content. Attached images are inlined and nothing has been stripped. When no HTML body was sent in the original message, a simple HTML body will be created. Use the querystring param ?download=1 to trigger file download in browser.
         *
         * @tags Messages
         * @name GetBodyDirty
         * @summary Get message HTML body (dirty)
         * @request GET:/dirty/{email}/{messageId}
         * @secure
         */
        getBodyDirty: (email: EmailString, messageId: MessageId, query?: {
            /** Download to browser */
            download?: 1;
        }, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * @description Get safe HTML from an email message. Scripts, images and links are stripped out. This HTML is safer to render than the potentially "dirty" original HTML. When no HTML body was sent in the original message, a simple HTML body will be created. Use the querystring param ?download=1 to trigger file download in browser.
         *
         * @tags Messages
         * @name GetBodySanitized
         * @summary Get the message HTML body (sanitized)
         * @request GET:/body/{email}/{messageId}
         * @secure
         */
        getBodySanitized: (email: EmailString, messageId: MessageId, query?: {
            /** Download to browser */
            download?: 1;
        }, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * @description Get a message's text content. If the original message only contained HTML, a simple plain text body will be generated. HTTP links in the plain text email will be available when fetching the message's metadata at the `message.links[]` property. Use the querystring param ?download=1 to trigger file download in browser.
         *
         * @tags Messages
         * @name GetBodyPlainText
         * @summary Get message plaintext
         * @request GET:/text/{email}/{messageId}
         * @secure
         */
        getBodyPlainText: (email: EmailString, messageId: MessageId, query?: {
            /** Download to browser */
            download?: 1;
        }, params?: RequestParams) => Promise<AxiosResponse<string, any>>;
        /**
         * @description Toggle a message's *starred* status so it will not be automatically recycled when the account's message storage limit is reached. There is no PUT body. It returns only the message metadata.
         *
         * @tags Messages
         * @name ToggleMessageStar
         * @summary Star (save) a message
         * @request PUT:/addresses/{email}/messages/{messageId}/star
         * @secure
         */
        toggleMessageStar: (email: EmailString, messageId: MessageId, params?: RequestParams) => Promise<AxiosResponse<EmailMessageShort, any>>;
        /**
         * @description To help organize messages and group messages together, add a label to a message. Labels are used in the Inbox UI to group messages. When successful, returns 200 with a subset of the message object. When the label already exists on the message, the message is not modified and the API endpoint returns 200. No PUT body is needed.
         *
         * @tags Messages
         * @name AddMessageLabel
         * @summary Add a label to a message
         * @request PUT:/addresses/{email}/messages/{messageId}/labels/{label}
         * @secure
         */
        addMessageLabel: (email: EmailString, messageId: MessageId, label: MessageLabel, params?: RequestParams) => Promise<AxiosResponse<{
            /** Unique Mailsac-generated identifier for an email message */
            _id?: MessageId;
            /** Labels for an email message */
            labels?: MessageLabels;
        }, any>>;
        /**
         * @description Removes a label from a message. Returns 200 with a subset of the message object when successful. When the label did not exists on the message, the message is not modified and the API endpoint returns 200.
         *
         * @tags Messages
         * @name DeleteMessageLabel
         * @summary Remove a label from a message
         * @request DELETE:/addresses/{email}/messages/{messageId}/labels/{label}
         * @secure
         */
        deleteMessageLabel: (email: EmailString, messageId: MessageId, label: MessageLabel, params?: RequestParams) => Promise<AxiosResponse<{
            /** Unique Mailsac-generated identifier for an email message */
            _id?: MessageId;
            /** Labels for an email message */
            labels?: MessageLabels;
        }, any>>;
        /**
         * @description Move the message to a different mail folder. No new folders can be added. To organize mail, use labels. No PUT body is needed.
         *
         * @tags Messages
         * @name SetMessageFolder
         * @summary Move a message into a folder
         * @request PUT:/addresses/{email}/messages/{messageId}/folder/{folder}
         * @secure
         */
        setMessageFolder: (email: EmailString, messageId: MessageId, folder: MessageFolder, params?: RequestParams) => Promise<AxiosResponse<{
            /** Unique Mailsac-generated identifier for an email message */
            _id?: MessageId;
            /** Folders for a email messages */
            folder?: MessageFolder;
        }, any>>;
        /**
         * @description Change the read state of a message. Pass `readBoolean` as `true` to mark the message as read, and `false` to mark it as unread. The default for any new message `false` (unread). No PUT body is needed.
         *
         * @tags Messages
         * @name SetMessageReadStatus
         * @summary Set message read/unread status
         * @request PUT:/addresses/{email}/messages/{messageId}/read/{readBoolean}
         * @secure
         */
        setMessageReadStatus: (email: EmailString, messageId: MessageId, readBoolean: ReadBoolean, params?: RequestParams) => Promise<AxiosResponse<{
            /** Unique Mailsac-generated identifier for an email message */
            _id?: MessageId;
            /** True to mark message as read, False to mark message unread. Default False */
            folder?: ReadBoolean;
        }, any>>;
        /**
         * @description Used by the Inbox UI to display all messages for the account, across all domains and private addresses. Returns email message short metadata, paginated, with the global account unread message count.
         *
         * @tags Messages
         * @name ListInboxMessages
         * @summary Get all account messages paginated
         * @request GET:/inbox
         * @secure
         */
        listInboxMessages: (query?: {
            /** Limit results to this many */
            limit?: Limit;
            /** Only fetch messages since this date */
            since?: Date;
            /** How many items to skip (like paging) */
            skip?: Skip;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            messages?: EmailMessageListShort[];
            unread?: number;
            limit?: number;
            skip?: number;
        }, any>>;
        /**
         * @description Filter account messages within the the `to` and `from` `.address` fields, and the `subject` line. This differs from `/api/inbox-search` by using logical AND, rather than OR in `/api/inbox-search`. At least one query condition is required, otherwise a 400 will be returned. A maximum of 100 results will ever be returned. Refine the query or reduce the number of messages in the account to find specific items.
         *
         * @tags Messages
         * @name FilterInboxMessages
         * @summary Filter messages in account by to, from, and/or subject
         * @request GET:/inbox-filter
         * @secure
         */
        filterInboxMessages: (query?: {
            /** Messages must include this text in the subject line */
            andSubjectIncludes?: string;
            /** Messages must include this text in FROM envelope */
            andFrom?: string;
            /** Messages must include this text in TO envelope or the `message.inbox` is equal to this value */
            andTo?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            messages?: EmailMessageListShort[];
        }, any>>;
        /**
         * @description Search all account messages within the the `to` and `from` `.address` fields, and the `subject` line. This differs from `/api/inbox-filter` by using logical OR, rather than AND in `/api/inbox-filter`. A maximum of 100 results will ever be returned. Refine the query or reduce the number of messages in the account to find specific items.
         *
         * @tags Messages
         * @name SearchInboxMessages
         * @summary Search messages by to, from, and subject
         * @request GET:/inbox-search
         * @secure
         */
        searchInboxMessages: (query?: {
            /** Searches to, from, and subject for all messages on this account, limited to 100 results. */
            query?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            query?: string;
            messages?: EmailMessageListShort[];
        }, any>>;
        /**
         * @description Get a list of messages across any inboxes of a domain. Messages are always **sorted in decending order by when they were received**, with the newest message always in the first position of the array. The email message objects are abbreviated to provide basic meta data. To get more information about a specific message, use `GET /api/addresses/{email}/messages/{messageId}`. The domain must be owned by the account making the request, and have DNS validated. Paginate with `until?=<Date>` and `limit=<uint>`.
         *
         * @tags Messages
         * @name ListDomainMessages
         * @summary List messages for an domain
         * @request GET:/domains/{domain}/messages
         * @secure
         */
        listDomainMessages: (domain: DomainString, query?: {
            /** Return messages returned up to this UTC date */
            until?: Date;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<EmailMessageListShort, any>>;
        /**
         * @description Delete all messages for a specifc domain. Starred messages will be deleted. The domain must be owned domain.
         *
         * @tags Messages
         * @name DeleteAllDomainMessages
         * @summary Delete all messages in a domain
         * @request POST:/domains/{domain}/delete-all-domain-mail
         * @secure
         */
        deleteAllDomainMessages: (domain: DomainString, params?: RequestParams) => Promise<AxiosResponse<void, any>>;
    };
    domains: {
        /**
         * @description List custom domains for the account.
         *
         * @tags Domains
         * @name ListDomains
         * @summary List domains
         * @request GET:/domains
         * @secure
         */
        listDomains: (params?: RequestParams) => Promise<AxiosResponse<DomainsList, any>>;
    };
    account: {
        /**
         * @description Get information about the account for this API key.
         *
         * @tags Account
         * @name User
         * @summary Get current account
         * @request GET:/me
         * @secure
         */
        user: (params?: RequestParams) => Promise<AxiosResponse<CurrentUserInfo, any>>;
        /**
         * @description Get summary information about email addresses, domains, and usage.
         *
         * @tags Account
         * @name AccountStats
         * @summary Get account stats
         * @request GET:/me/stats
         * @secure
         */
        accountStats: (query?: {
            overrideAccountId?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<CurrentUserStats, any>>;
    };
    attachments: {
        /**
         * @description Get attachment metadata on email message.
         *
         * @tags Attachments
         * @name ListMessageAttachments
         * @summary List attachments for an email message
         * @request GET:/addresses/{email}/messages/{messageId}/attachments
         * @secure
         */
        listMessageAttachments: (email: EmailString, messageId: MessageId, params?: RequestParams) => Promise<AxiosResponse<AttachmentMeta, any>>;
        /**
         * @description Download an email message attachment as a file.
         *
         * @tags Attachments
         * @name DownloadAttachment
         * @summary Download email attachment
         * @request GET:/addresses/{email}/messages/{messageId}/attachments/{attachmentIdentifier}
         * @secure
         */
        downloadAttachment: (email: EmailString, messageId: MessageId, attachmentIdentifier: AttachmentIdentifier, params?: RequestParams) => Promise<AxiosResponse<File, any>>;
        /**
         * @description Search for attachments that were received during the requested time period. Limited to public inboxes and messages not starred by a user. Responds with 'Failed to fetch' in swagger editor. Works in curl with generated example.
         *
         * @tags Attachments
         * @name ListPublicAttachments
         * @summary Search for attachments
         * @request GET:/mailstats/common-attachments
         * @secure
         */
        listPublicAttachments: (query: {
            /** Date in ISO 8601 */
            startDate: Date;
            /** Date in ISO 8601 */
            endDate: Date;
            /** How many items to skip (like paging) */
            skip?: Skip;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<CommonAttachments[], any>>;
        /**
         * @description Provides count of attachments by md5 sum Responds with 'Failed to fetch' in swagger editor, works in curl with generated example
         *
         * @tags Attachments
         * @name CountPublicAttachments
         * @summary Count public attachments
         * @request GET:/mailstats/common-attachments/{md5sum}/count
         * @secure
         */
        countPublicAttachments: (md5Sum: Md5Sum, params?: RequestParams) => Promise<AxiosResponse<{
            n?: number;
        }, any>>;
        /**
         * @description List the email messages that have attachments with the requested MD5 sum. Limited to non-private inboxes.
         *
         * @tags Attachments
         * @name ListMessagesForAttachment
         * @summary List public messages with an attachment
         * @request GET:/mailstats/common-attachments/{md5sum}
         * @secure
         */
        listMessagesForAttachment: (md5Sum: Md5Sum, params?: RequestParams) => Promise<AxiosResponse<EmailMessage, any>>;
        /**
         * @description Download an attachment with the MD5 sum requested.
         *
         * @tags Attachments
         * @name DownloadPublicAttachment
         * @summary Download public attachment
         * @request GET:/mailstats/common-attachments/{md5sum}/download
         * @secure
         */
        downloadPublicAttachment: (md5Sum: Md5Sum, params?: RequestParams) => Promise<AxiosResponse<void, any>>;
    };
    messageStats: {
        /**
         * No description
         *
         * @tags messageStats
         * @name ListTopPublicAddresses
         * @summary List top public disposable email addresses receiving messages
         * @request GET:/mailstats/top-addresses
         * @secure
         */
        listTopPublicAddresses: (query?: {
            /** Date in ISO 8601 */
            startDate?: Date;
            /** Date in ISO 8601 */
            endDate?: Date;
            /** How many items to skip (like paging) */
            skip?: Skip;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            /** email address */
            _id?: EmailString;
            /** count of messages */
            n?: number;
        }, any>>;
        /**
         * No description
         *
         * @tags messageStats
         * @name ListTopPublicSenders
         * @summary List top sender email addresses for disposable public messages
         * @request GET:/mailstats/top-senders
         * @secure
         */
        listTopPublicSenders: (query?: {
            /** Date in ISO 8601 */
            startDate?: Date;
            /** Date in ISO 8601 */
            endDate?: Date;
            /** How many items to skip (like paging) */
            skip?: Skip;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            /** email address */
            _id?: EmailString;
            /** count of messages */
            n?: number;
        }, any>>;
        /**
         * No description
         *
         * @tags messageStats
         * @name ListTopPublicDomains
         * @summary List top public domains receiving disposable messages
         * @request GET:/mailstats/top-domains
         * @secure
         */
        listTopPublicDomains: (query?: {
            /** Date in ISO 8601 */
            startDate?: Date;
            /** Date in ISO 8601 */
            endDate?: Date;
            /** How many items to skip (like paging) */
            skip?: Skip;
            /** Limit results to this many */
            limit?: Limit;
        }, params?: RequestParams) => Promise<AxiosResponse<{
            /**
             * domain other than mailsac.com
             * @format domain
             */
            _id?: string;
            /** count of messages */
            n?: number;
        }, any>>;
        /**
         * No description
         *
         * @tags messageStats
         * @name Denylist
         * @summary List the current deny-list
         * @request GET:/mailstats/blacklist
         * @secure
         */
        denylist: (params?: RequestParams) => Promise<AxiosResponse<string[], any>>;
        /**
         * @description Check whether an IP or domain is currently on the deny-list.
         *
         * @tags messageStats
         * @name CheckDenylist
         * @summary Check IP or domain on deny-list
         * @request GET:/mailstats/blacklist/{domainOrIP}
         * @secure
         */
        checkDenylist: (domainOrIp: string, params?: RequestParams) => Promise<AxiosResponse<{
            blacklisted?: boolean;
        }, any>>;
    };
    webSockets: {
        /**
         * @description *Note: this does not work in Swagger UI. Visit https://sock.mailsac.com to test.* You can receive email via web socket for private email addresses and custom domains. To enable web socket forwarding: * Addresses: Select *Edit* for the email address you want to forward. Then check the checkbox for web socket forwarding, and save. * Custom Domains: Select *Manage* for the domain and click the *Forwarding* tab. Toggle the *Enable Web Sockets* option. Note: Web socket forwarding is **not enabled by default.** ### Web Socket Examples #### Web Socket Test Page https://sock.mailsac.com Receive emails in your web browser. Experiment with the web socket gateway in realtime. #### Web Socket Node.js Listen for Mailsac emails via websocket in this tiny Node.js example app. https://github.com/ruffrey/mailsac-node-websocket-example ### Web Socket Connection Endpoint The web socket endpoint is `wss://sock.mailsac.com/incoming-messages` Example: > wss://sock.mailsac.com/incoming-messages?key=k_e9bPnd2adexample&addresses=jeff@mailsac.com,asdf-outbound.mailsac.com > First frame: ``` { "status": 200, "msg": "Listening", "addresses": [ "jeff@mailsac.com" ], "domains": [ "asdf-outbound.mailsac.com" ] } ``` All web socket messages are JSON. After parsing the JSON, there will be a status field with an HTTP status code (usually 200). An email coming over the web socket will also have an email property, and its value will be the same as the messages REST API, plus some additional fields.
         *
         * @tags Web Sockets
         * @name DoNotUseWebSocketDocsOnly
         * @summary Connect a web socket to wss://sock.mailsac.com/incoming-messages
         * @request POST:/custom_web_sockets
         */
        doNotUseWebSocketDocsOnly: (query?: {
            /** Mailsac-Key in the `?key=` querystring */
            key?: string;
            /**
             * Enhanced addresses or domains which are enabled for web socket messages
             * @example "anything_123@mailsac.com,mail.mydomain.com"
             */
            addresses?: string;
        }, params?: RequestParams) => Promise<AxiosResponse<any, any>>;
    };
    webhooks: {
        /**
         * @description *Note: this does not work in Swagger UI.* Webhook Forwarding is one of several options available for enhanced addresses and custom domains (via catch-all addresses enabled under a custom domain). Forwarding to a Webhook can be configured by selecting Manage Email Addresses from the Dashboard. Select the Settings button next to the email address to manage, then input the URL under Forward To Custom Webhook and select Save Settings. Troubleshoot webhooks using your account *Audit Logs*.
         *
         * @tags Webhooks
         * @name DoNotUseWebhookDocsOnly
         * @summary Receive a webhook email message on your server
         * @request POST:/custom_webhooks
         */
        doNotUseWebhookDocsOnly: (params?: RequestParams) => Promise<AxiosResponse<void, any>>;
    };
}
