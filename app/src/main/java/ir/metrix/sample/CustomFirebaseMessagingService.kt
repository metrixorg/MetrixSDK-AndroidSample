package ir.metrix.sample

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import ir.metrix.notification.MetrixNotification

class CustomFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
    }

    override fun onMessageReceived(message: RemoteMessage) {
        Log.d("messaging", "onMessageReceived: ${message.messageId}, ${message.sentTime}")
        Log.d("messaging", message.data.toString())

        if (MetrixNotification.onMessageReceived(message)) return

        // here you can process your own fcm messages
    }
}