import Client from "../client";
import Service from "../service";
import { RecurringDetailsRequest, RecurringDetailsResult, DisableRequest, DisableResult, ScheduleAccountUpdaterRequest, ScheduleAccountUpdaterResult, NotifyShopperRequest, NotifyShopperResult } from "../typings/recurring/models";
declare class Recurring extends Service {
    private readonly _listRecurringDetails;
    private readonly _disable;
    private readonly _scheduleAccountUpdater;
    private readonly _notifyShopper;
    constructor(client: Client);
    listRecurringDetails(request: RecurringDetailsRequest): Promise<RecurringDetailsResult>;
    disable(request: DisableRequest): Promise<DisableResult>;
    scheduleAccountUpdater(request: ScheduleAccountUpdaterRequest): Promise<ScheduleAccountUpdaterResult>;
    notifyShopper(request: NotifyShopperRequest): Promise<NotifyShopperResult>;
}
export default Recurring;
