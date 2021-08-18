import Service from "../../../service";
import Resource from "../../resource";
declare class Refunds extends Resource {
    constructor(service: Service, paymentPspReference: string);
}
export default Refunds;
