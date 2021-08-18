import Client from "../client";
import Service from "../service";
import { ApplicationInfo } from "../typings/applicationInfo";
import { IRequest } from "../typings/requestOptions";
import { CreatePaymentAmountUpdateRequest, CreatePaymentCancelRequest, CreatePaymentCaptureRequest, CreatePaymentRefundRequest, CreatePaymentReversalRequest, CreateStandalonePaymentCancelRequest, PaymentAmountUpdateResource, PaymentCancelResource, PaymentCaptureResource, PaymentRefundResource, PaymentReversalResource, StandalonePaymentCancelResource } from "../typings/checkout/models";
interface AppInfo {
    applicationInfo?: ApplicationInfo;
}
declare type GenericRequest<T> = T & AppInfo;
declare class Modification extends Service {
    constructor(client: Client);
    amountUpdates(paymentPspReference: string, amountUpdatesRequest: GenericRequest<CreatePaymentAmountUpdateRequest>, requestOptions?: IRequest.Options): Promise<PaymentAmountUpdateResource>;
    cancelsStandalone(cancelsStandaloneRequest: GenericRequest<CreateStandalonePaymentCancelRequest>, requestOptions?: IRequest.Options): Promise<StandalonePaymentCancelResource>;
    cancels(paymentPspReference: string, cancelsRequest: GenericRequest<CreatePaymentCancelRequest>, requestOptions?: IRequest.Options): Promise<PaymentCancelResource>;
    captures(paymentPspReference: string, capturesRequest: GenericRequest<CreatePaymentCaptureRequest>, requestOptions?: IRequest.Options): Promise<PaymentCaptureResource>;
    refunds(paymentPspReference: string, refundsRequest: GenericRequest<CreatePaymentRefundRequest>, requestOptions?: IRequest.Options): Promise<PaymentRefundResource>;
    reversals(paymentPspReference: string, reversalsRequest: GenericRequest<CreatePaymentReversalRequest>, requestOptions?: IRequest.Options): Promise<PaymentReversalResource>;
}
export default Modification;
