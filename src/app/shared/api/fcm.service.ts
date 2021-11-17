import { Injectable } from "@angular/core";
import { Capacitor, Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class FcmService {
    deviceToken: string;
    constructor() {}

    public initPush(): void {
        if (Capacitor.platform !== 'web') {
            this.registerPush();
        }
    }

    private registerPush(): void {
        PushNotifications.register();
                        
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
            alert('Push registration success, token: ' + token.value);
            console.log('Push registration success, token: ' + token.value);
            this.deviceToken = token.value;
        });

        PushNotifications.addListener('registrationError', (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
        });
        
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            alert('Push received: ' + JSON.stringify(notification));
        });
        
        PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
            alert('Push action performed: ' + JSON.stringify(notification));
        });
    }
}