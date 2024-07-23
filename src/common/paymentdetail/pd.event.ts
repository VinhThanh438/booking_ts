import eventbus from "@common/eventbus";
import User from "@common/user/User"
import { DoneCallback, Job } from "bull";
import logger from '@common/logger'


export default class paymentEvent {
    public static register() {
        eventbus.on('PAYMENT_CREATED', paymentEvent.handler )
    }

    public static async handler(job: Job, done: DoneCallback): Promise<void> {
        try {
            // logic

            // const {userName, total} = job.data
            // const data = await User.findOne({userName})
            // const newBalance = data.balance - total
            // if (newBalance < 0) {
            //     logger.error('balance < total price!')
            //     return
            // } else {
            //     User.findOneAndUpdate({userName}, {$set: {balance: newBalance}})
            // }
        } catch (error) {
            logger.error('can not update user`s balance!', error)
        }
    }
}