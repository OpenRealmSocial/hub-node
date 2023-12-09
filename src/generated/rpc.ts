/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientReadableStream,
  ClientUnaryCall,
  handleServerStreamingCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { HubEvent } from "./hub_event";
import { CastId, Message } from "./message";
import { OnChainEvent } from "./onchain_event";
import {
  CastsByParentRequest,
  Empty,
  EventRequest,
  QidRequest,
  QidsRequest,
  QidsResponse,
  HubInfoRequest,
  HubInfoResponse,
  IdRegistryEventByAddressRequest,
  LinkRequest,
  LinksByQidRequest,
  LinksByTargetRequest,
  MessagesResponse,
  OnChainEventRequest,
  OnChainEventResponse,
  ReactionRequest,
  ReactionsByQidRequest,
  ReactionsByTargetRequest,
  SignerRequest,
  StorageLimitsResponse,
  SubscribeRequest,
  SyncIds,
  SyncStatusRequest,
  SyncStatusResponse,
  TrieNodeMetadataResponse,
  TrieNodePrefix,
  TrieNodeSnapshotResponse,
  UserDataRequest,
  UsernameProofRequest,
  UsernameProofsResponse,
  VerificationRequest,
} from "./request_response";
import { UserNameProof } from "./username_proof";

export type HubServiceService = typeof HubServiceService;
export const HubServiceService = {
  /** Submit Methods */
  submitMessage: {
    path: "/HubService/SubmitMessage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Message.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  /**
   * Event Methods
   * @http-api: none
   */
  subscribe: {
    path: "/HubService/Subscribe",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: SubscribeRequest) => Buffer.from(SubscribeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubscribeRequest.decode(value),
    responseSerialize: (value: HubEvent) => Buffer.from(HubEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HubEvent.decode(value),
  },
  /** @http-api: events */
  getEvent: {
    path: "/HubService/GetEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EventRequest) => Buffer.from(EventRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EventRequest.decode(value),
    responseSerialize: (value: HubEvent) => Buffer.from(HubEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HubEvent.decode(value),
  },
  /**
   * Casts
   * @http-api: castById
   */
  getCast: {
    path: "/HubService/GetCast",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CastId) => Buffer.from(CastId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CastId.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getCastsByQid: {
    path: "/HubService/GetCastsByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  getCastsByParent: {
    path: "/HubService/GetCastsByParent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CastsByParentRequest) => Buffer.from(CastsByParentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CastsByParentRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  getCastsByMention: {
    path: "/HubService/GetCastsByMention",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * Reactions
   * @http-api: reactionById
   */
  getReaction: {
    path: "/HubService/GetReaction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactionRequest) => Buffer.from(ReactionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getReactionsByQid: {
    path: "/HubService/GetReactionsByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactionsByQidRequest) => Buffer.from(ReactionsByQidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionsByQidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** To be deprecated */
  getReactionsByCast: {
    path: "/HubService/GetReactionsByCast",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactionsByTargetRequest) => Buffer.from(ReactionsByTargetRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionsByTargetRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  getReactionsByTarget: {
    path: "/HubService/GetReactionsByTarget",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactionsByTargetRequest) => Buffer.from(ReactionsByTargetRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactionsByTargetRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * User Data
   * @http-api: none
   */
  getUserData: {
    path: "/HubService/GetUserData",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserDataRequest) => Buffer.from(UserDataRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserDataRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getUserDataByQid: {
    path: "/HubService/GetUserDataByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * Username Proof
   * @http-api: userNameProofByName
   */
  getUsernameProof: {
    path: "/HubService/GetUsernameProof",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UsernameProofRequest) => Buffer.from(UsernameProofRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UsernameProofRequest.decode(value),
    responseSerialize: (value: UserNameProof) => Buffer.from(UserNameProof.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UserNameProof.decode(value),
  },
  getUserNameProofsByQid: {
    path: "/HubService/GetUserNameProofsByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: UsernameProofsResponse) => Buffer.from(UsernameProofsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UsernameProofsResponse.decode(value),
  },
  /**
   * Verifications
   * @http-api: none
   */
  getVerification: {
    path: "/HubService/GetVerification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: VerificationRequest) => Buffer.from(VerificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => VerificationRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getVerificationsByQid: {
    path: "/HubService/GetVerificationsByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * OnChain Events
   * @http-api: none
   */
  getOnChainSigner: {
    path: "/HubService/GetOnChainSigner",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SignerRequest) => Buffer.from(SignerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SignerRequest.decode(value),
    responseSerialize: (value: OnChainEvent) => Buffer.from(OnChainEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEvent.decode(value),
  },
  getOnChainSignersByQid: {
    path: "/HubService/GetOnChainSignersByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: OnChainEventResponse) => Buffer.from(OnChainEventResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEventResponse.decode(value),
  },
  /** @http-api: none */
  getOnChainEvents: {
    path: "/HubService/GetOnChainEvents",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: OnChainEventRequest) => Buffer.from(OnChainEventRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => OnChainEventRequest.decode(value),
    responseSerialize: (value: OnChainEventResponse) => Buffer.from(OnChainEventResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEventResponse.decode(value),
  },
  /** @http-api: none */
  getIdRegistryOnChainEvent: {
    path: "/HubService/GetIdRegistryOnChainEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: OnChainEvent) => Buffer.from(OnChainEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEvent.decode(value),
  },
  /** @http-api: onChainIdRegistryEventByAddress */
  getIdRegistryOnChainEventByAddress: {
    path: "/HubService/GetIdRegistryOnChainEventByAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IdRegistryEventByAddressRequest) =>
      Buffer.from(IdRegistryEventByAddressRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IdRegistryEventByAddressRequest.decode(value),
    responseSerialize: (value: OnChainEvent) => Buffer.from(OnChainEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEvent.decode(value),
  },
  /** @http-api: storageLimitsByQid */
  getCurrentStorageLimitsByQid: {
    path: "/HubService/GetCurrentStorageLimitsByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: StorageLimitsResponse) => Buffer.from(StorageLimitsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => StorageLimitsResponse.decode(value),
  },
  getQids: {
    path: "/HubService/GetQids",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidsRequest) => Buffer.from(QidsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidsRequest.decode(value),
    responseSerialize: (value: QidsResponse) => Buffer.from(QidsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => QidsResponse.decode(value),
  },
  /**
   * Links
   * @http-api: linkById
   */
  getLink: {
    path: "/HubService/GetLink",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LinkRequest) => Buffer.from(LinkRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LinkRequest.decode(value),
    responseSerialize: (value: Message) => Buffer.from(Message.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Message.decode(value),
  },
  getLinksByQid: {
    path: "/HubService/GetLinksByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LinksByQidRequest) => Buffer.from(LinksByQidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LinksByQidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: linksByTargetQid */
  getLinksByTarget: {
    path: "/HubService/GetLinksByTarget",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LinksByTargetRequest) => Buffer.from(LinksByTargetRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LinksByTargetRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * Bulk Methods
   * The Bulk methods don't have corresponding HTTP API endpoints because the
   * regular endpoints can be used to get all the messages
   * @http-api: none
   */
  getAllCastMessagesByQid: {
    path: "/HubService/GetAllCastMessagesByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: none */
  getAllReactionMessagesByQid: {
    path: "/HubService/GetAllReactionMessagesByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: none */
  getAllVerificationMessagesByQid: {
    path: "/HubService/GetAllVerificationMessagesByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: none */
  getAllUserDataMessagesByQid: {
    path: "/HubService/GetAllUserDataMessagesByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: none */
  getAllLinkMessagesByQid: {
    path: "/HubService/GetAllLinkMessagesByQid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QidRequest) => Buffer.from(QidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QidRequest.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /**
   * Sync Methods
   * Outside the "info" RPC, the HTTP API doesn't implement any of the sync methods
   */
  getInfo: {
    path: "/HubService/GetInfo",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HubInfoRequest) => Buffer.from(HubInfoRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HubInfoRequest.decode(value),
    responseSerialize: (value: HubInfoResponse) => Buffer.from(HubInfoResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HubInfoResponse.decode(value),
  },
  /** @http-api: none */
  getSyncStatus: {
    path: "/HubService/GetSyncStatus",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SyncStatusRequest) => Buffer.from(SyncStatusRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SyncStatusRequest.decode(value),
    responseSerialize: (value: SyncStatusResponse) => Buffer.from(SyncStatusResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SyncStatusResponse.decode(value),
  },
  /** @http-api: none */
  getAllSyncIdsByPrefix: {
    path: "/HubService/GetAllSyncIdsByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: SyncIds) => Buffer.from(SyncIds.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SyncIds.decode(value),
  },
  /** @http-api: none */
  getAllMessagesBySyncIds: {
    path: "/HubService/GetAllMessagesBySyncIds",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SyncIds) => Buffer.from(SyncIds.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SyncIds.decode(value),
    responseSerialize: (value: MessagesResponse) => Buffer.from(MessagesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MessagesResponse.decode(value),
  },
  /** @http-api: none */
  getSyncMetadataByPrefix: {
    path: "/HubService/GetSyncMetadataByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: TrieNodeMetadataResponse) =>
      Buffer.from(TrieNodeMetadataResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TrieNodeMetadataResponse.decode(value),
  },
  /** @http-api: none */
  getSyncSnapshotByPrefix: {
    path: "/HubService/GetSyncSnapshotByPrefix",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TrieNodePrefix) => Buffer.from(TrieNodePrefix.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TrieNodePrefix.decode(value),
    responseSerialize: (value: TrieNodeSnapshotResponse) =>
      Buffer.from(TrieNodeSnapshotResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TrieNodeSnapshotResponse.decode(value),
  },
} as const;

export interface HubServiceServer extends UntypedServiceImplementation {
  /** Submit Methods */
  submitMessage: handleUnaryCall<Message, Message>;
  /**
   * Event Methods
   * @http-api: none
   */
  subscribe: handleServerStreamingCall<SubscribeRequest, HubEvent>;
  /** @http-api: events */
  getEvent: handleUnaryCall<EventRequest, HubEvent>;
  /**
   * Casts
   * @http-api: castById
   */
  getCast: handleUnaryCall<CastId, Message>;
  getCastsByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  getCastsByParent: handleUnaryCall<CastsByParentRequest, MessagesResponse>;
  getCastsByMention: handleUnaryCall<QidRequest, MessagesResponse>;
  /**
   * Reactions
   * @http-api: reactionById
   */
  getReaction: handleUnaryCall<ReactionRequest, Message>;
  getReactionsByQid: handleUnaryCall<ReactionsByQidRequest, MessagesResponse>;
  /** To be deprecated */
  getReactionsByCast: handleUnaryCall<ReactionsByTargetRequest, MessagesResponse>;
  getReactionsByTarget: handleUnaryCall<ReactionsByTargetRequest, MessagesResponse>;
  /**
   * User Data
   * @http-api: none
   */
  getUserData: handleUnaryCall<UserDataRequest, Message>;
  getUserDataByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /**
   * Username Proof
   * @http-api: userNameProofByName
   */
  getUsernameProof: handleUnaryCall<UsernameProofRequest, UserNameProof>;
  getUserNameProofsByQid: handleUnaryCall<QidRequest, UsernameProofsResponse>;
  /**
   * Verifications
   * @http-api: none
   */
  getVerification: handleUnaryCall<VerificationRequest, Message>;
  getVerificationsByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /**
   * OnChain Events
   * @http-api: none
   */
  getOnChainSigner: handleUnaryCall<SignerRequest, OnChainEvent>;
  getOnChainSignersByQid: handleUnaryCall<QidRequest, OnChainEventResponse>;
  /** @http-api: none */
  getOnChainEvents: handleUnaryCall<OnChainEventRequest, OnChainEventResponse>;
  /** @http-api: none */
  getIdRegistryOnChainEvent: handleUnaryCall<QidRequest, OnChainEvent>;
  /** @http-api: onChainIdRegistryEventByAddress */
  getIdRegistryOnChainEventByAddress: handleUnaryCall<IdRegistryEventByAddressRequest, OnChainEvent>;
  /** @http-api: storageLimitsByQid */
  getCurrentStorageLimitsByQid: handleUnaryCall<QidRequest, StorageLimitsResponse>;
  getQids: handleUnaryCall<QidsRequest, QidsResponse>;
  /**
   * Links
   * @http-api: linkById
   */
  getLink: handleUnaryCall<LinkRequest, Message>;
  getLinksByQid: handleUnaryCall<LinksByQidRequest, MessagesResponse>;
  /** @http-api: linksByTargetQid */
  getLinksByTarget: handleUnaryCall<LinksByTargetRequest, MessagesResponse>;
  /**
   * Bulk Methods
   * The Bulk methods don't have corresponding HTTP API endpoints because the
   * regular endpoints can be used to get all the messages
   * @http-api: none
   */
  getAllCastMessagesByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /** @http-api: none */
  getAllReactionMessagesByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /** @http-api: none */
  getAllVerificationMessagesByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /** @http-api: none */
  getAllUserDataMessagesByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /** @http-api: none */
  getAllLinkMessagesByQid: handleUnaryCall<QidRequest, MessagesResponse>;
  /**
   * Sync Methods
   * Outside the "info" RPC, the HTTP API doesn't implement any of the sync methods
   */
  getInfo: handleUnaryCall<HubInfoRequest, HubInfoResponse>;
  /** @http-api: none */
  getSyncStatus: handleUnaryCall<SyncStatusRequest, SyncStatusResponse>;
  /** @http-api: none */
  getAllSyncIdsByPrefix: handleUnaryCall<TrieNodePrefix, SyncIds>;
  /** @http-api: none */
  getAllMessagesBySyncIds: handleUnaryCall<SyncIds, MessagesResponse>;
  /** @http-api: none */
  getSyncMetadataByPrefix: handleUnaryCall<TrieNodePrefix, TrieNodeMetadataResponse>;
  /** @http-api: none */
  getSyncSnapshotByPrefix: handleUnaryCall<TrieNodePrefix, TrieNodeSnapshotResponse>;
}

export interface HubServiceClient extends Client {
  /** Submit Methods */
  submitMessage(request: Message, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  submitMessage(
    request: Message,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  submitMessage(
    request: Message,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  /**
   * Event Methods
   * @http-api: none
   */
  subscribe(request: SubscribeRequest, options?: Partial<CallOptions>): ClientReadableStream<HubEvent>;
  subscribe(
    request: SubscribeRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<HubEvent>;
  /** @http-api: events */
  getEvent(request: EventRequest, callback: (error: ServiceError | null, response: HubEvent) => void): ClientUnaryCall;
  getEvent(
    request: EventRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HubEvent) => void,
  ): ClientUnaryCall;
  getEvent(
    request: EventRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HubEvent) => void,
  ): ClientUnaryCall;
  /**
   * Casts
   * @http-api: castById
   */
  getCast(request: CastId, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  getCast(
    request: CastId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getCast(
    request: CastId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getCastsByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByParent(
    request: CastsByParentRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByParent(
    request: CastsByParentRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByParent(
    request: CastsByParentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByMention(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByMention(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getCastsByMention(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * Reactions
   * @http-api: reactionById
   */
  getReaction(
    request: ReactionRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReaction(
    request: ReactionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReaction(
    request: ReactionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getReactionsByQid(
    request: ReactionsByQidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByQid(
    request: ReactionsByQidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByQid(
    request: ReactionsByQidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** To be deprecated */
  getReactionsByCast(
    request: ReactionsByTargetRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByCast(
    request: ReactionsByTargetRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByCast(
    request: ReactionsByTargetRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByTarget(
    request: ReactionsByTargetRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByTarget(
    request: ReactionsByTargetRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getReactionsByTarget(
    request: ReactionsByTargetRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * User Data
   * @http-api: none
   */
  getUserData(
    request: UserDataRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserData(
    request: UserDataRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserData(
    request: UserDataRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getUserDataByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getUserDataByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getUserDataByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * Username Proof
   * @http-api: userNameProofByName
   */
  getUsernameProof(
    request: UsernameProofRequest,
    callback: (error: ServiceError | null, response: UserNameProof) => void,
  ): ClientUnaryCall;
  getUsernameProof(
    request: UsernameProofRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UserNameProof) => void,
  ): ClientUnaryCall;
  getUsernameProof(
    request: UsernameProofRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UserNameProof) => void,
  ): ClientUnaryCall;
  getUserNameProofsByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: UsernameProofsResponse) => void,
  ): ClientUnaryCall;
  getUserNameProofsByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UsernameProofsResponse) => void,
  ): ClientUnaryCall;
  getUserNameProofsByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UsernameProofsResponse) => void,
  ): ClientUnaryCall;
  /**
   * Verifications
   * @http-api: none
   */
  getVerification(
    request: VerificationRequest,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerification(
    request: VerificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerification(
    request: VerificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getVerificationsByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getVerificationsByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getVerificationsByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * OnChain Events
   * @http-api: none
   */
  getOnChainSigner(
    request: SignerRequest,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getOnChainSigner(
    request: SignerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getOnChainSigner(
    request: SignerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getOnChainSignersByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  getOnChainSignersByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  getOnChainSignersByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getOnChainEvents(
    request: OnChainEventRequest,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  getOnChainEvents(
    request: OnChainEventRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  getOnChainEvents(
    request: OnChainEventRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEventResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getIdRegistryOnChainEvent(
    request: QidRequest,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getIdRegistryOnChainEvent(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getIdRegistryOnChainEvent(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  /** @http-api: onChainIdRegistryEventByAddress */
  getIdRegistryOnChainEventByAddress(
    request: IdRegistryEventByAddressRequest,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getIdRegistryOnChainEventByAddress(
    request: IdRegistryEventByAddressRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  getIdRegistryOnChainEventByAddress(
    request: IdRegistryEventByAddressRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  /** @http-api: storageLimitsByQid */
  getCurrentStorageLimitsByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: StorageLimitsResponse) => void,
  ): ClientUnaryCall;
  getCurrentStorageLimitsByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: StorageLimitsResponse) => void,
  ): ClientUnaryCall;
  getCurrentStorageLimitsByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: StorageLimitsResponse) => void,
  ): ClientUnaryCall;
  getQids(
    request: QidsRequest,
    callback: (error: ServiceError | null, response: QidsResponse) => void,
  ): ClientUnaryCall;
  getQids(
    request: QidsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: QidsResponse) => void,
  ): ClientUnaryCall;
  getQids(
    request: QidsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: QidsResponse) => void,
  ): ClientUnaryCall;
  /**
   * Links
   * @http-api: linkById
   */
  getLink(request: LinkRequest, callback: (error: ServiceError | null, response: Message) => void): ClientUnaryCall;
  getLink(
    request: LinkRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getLink(
    request: LinkRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Message) => void,
  ): ClientUnaryCall;
  getLinksByQid(
    request: LinksByQidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getLinksByQid(
    request: LinksByQidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getLinksByQid(
    request: LinksByQidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: linksByTargetQid */
  getLinksByTarget(
    request: LinksByTargetRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getLinksByTarget(
    request: LinksByTargetRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getLinksByTarget(
    request: LinksByTargetRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * Bulk Methods
   * The Bulk methods don't have corresponding HTTP API endpoints because the
   * regular endpoints can be used to get all the messages
   * @http-api: none
   */
  getAllCastMessagesByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllCastMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllCastMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllReactionMessagesByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllReactionMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllReactionMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllVerificationMessagesByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllVerificationMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllVerificationMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllUserDataMessagesByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllUserDataMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllUserDataMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllLinkMessagesByQid(
    request: QidRequest,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllLinkMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllLinkMessagesByQid(
    request: QidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /**
   * Sync Methods
   * Outside the "info" RPC, the HTTP API doesn't implement any of the sync methods
   */
  getInfo(
    request: HubInfoRequest,
    callback: (error: ServiceError | null, response: HubInfoResponse) => void,
  ): ClientUnaryCall;
  getInfo(
    request: HubInfoRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HubInfoResponse) => void,
  ): ClientUnaryCall;
  getInfo(
    request: HubInfoRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HubInfoResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getSyncStatus(
    request: SyncStatusRequest,
    callback: (error: ServiceError | null, response: SyncStatusResponse) => void,
  ): ClientUnaryCall;
  getSyncStatus(
    request: SyncStatusRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SyncStatusResponse) => void,
  ): ClientUnaryCall;
  getSyncStatus(
    request: SyncStatusRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SyncStatusResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  getAllSyncIdsByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SyncIds) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getAllMessagesBySyncIds(
    request: SyncIds,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllMessagesBySyncIds(
    request: SyncIds,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  getAllMessagesBySyncIds(
    request: SyncIds,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MessagesResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  getSyncMetadataByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TrieNodeMetadataResponse) => void,
  ): ClientUnaryCall;
  /** @http-api: none */
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
  getSyncSnapshotByPrefix(
    request: TrieNodePrefix,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TrieNodeSnapshotResponse) => void,
  ): ClientUnaryCall;
}

export const HubServiceClient = makeGenericClientConstructor(HubServiceService, "HubService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): HubServiceClient;
  service: typeof HubServiceService;
};

export type AdminServiceService = typeof AdminServiceService;
export const AdminServiceService = {
  rebuildSyncTrie: {
    path: "/AdminService/RebuildSyncTrie",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deleteAllMessagesFromDb: {
    path: "/AdminService/DeleteAllMessagesFromDb",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  submitOnChainEvent: {
    path: "/AdminService/SubmitOnChainEvent",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: OnChainEvent) => Buffer.from(OnChainEvent.encode(value).finish()),
    requestDeserialize: (value: Buffer) => OnChainEvent.decode(value),
    responseSerialize: (value: OnChainEvent) => Buffer.from(OnChainEvent.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OnChainEvent.decode(value),
  },
} as const;

export interface AdminServiceServer extends UntypedServiceImplementation {
  rebuildSyncTrie: handleUnaryCall<Empty, Empty>;
  deleteAllMessagesFromDb: handleUnaryCall<Empty, Empty>;
  submitOnChainEvent: handleUnaryCall<OnChainEvent, OnChainEvent>;
}

export interface AdminServiceClient extends Client {
  rebuildSyncTrie(request: Empty, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
  rebuildSyncTrie(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  rebuildSyncTrie(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteAllMessagesFromDb(
    request: Empty,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteAllMessagesFromDb(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteAllMessagesFromDb(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  submitOnChainEvent(
    request: OnChainEvent,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  submitOnChainEvent(
    request: OnChainEvent,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
  submitOnChainEvent(
    request: OnChainEvent,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OnChainEvent) => void,
  ): ClientUnaryCall;
}

export const AdminServiceClient = makeGenericClientConstructor(AdminServiceService, "AdminService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AdminServiceClient;
  service: typeof AdminServiceService;
};
