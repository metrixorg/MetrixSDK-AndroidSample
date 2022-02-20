package ir.metrix.sample

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import ir.metrix.AttributionData
import ir.metrix.Metrix
import ir.metrix.OnAttributionChangeListener
import ir.metrix.UserIdListener
import ir.metrix.messaging.RevenueCurrency
import ir.metrix.session.SessionIdListener
import ir.metrix.session.SessionNumberListener

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Optional
        Metrix.addUserAttributes(mapOf("phoneNumber" to "09121111111"))

        // Optional
        Metrix.setUserIdListener(object : UserIdListener {
            override fun onUserIdReceived(userId: String) {
                // Replace with your logic
                findViewById<TextView>(R.id.userIdTV).text = "User ID: $userId"
            }
        })

        // Optional
        Metrix.setOnAttributionChangedListener(object : OnAttributionChangeListener {
            override fun onAttributionChanged(attributionData: AttributionData) {
                // Replace with your logic
                Log.d("MetrixSample", "onAttributionChanged: userAttributionStatus: ${attributionData.attributionStatus}")
            }
        })

        findViewById<Button>(R.id.sendEventBTN).setOnClickListener {
            Metrix.newEvent("lbuoa", mapOf("name" to "Ali"))
        }
        findViewById<Button>(R.id.sendRevenueBTN).setOnClickListener {
            Metrix.newRevenue("ykwyp", 250000.0, RevenueCurrency.IRR)
        }
    }

    override fun onResume() {
        super.onResume()

        // Optional
        Metrix.setSessionIdListener(object : SessionIdListener {
            override fun onSessionIdChanged(sessionId: String) {
                // Replace with your logic
                findViewById<TextView>(R.id.sessionIdTV).text = "Session ID: $sessionId"
            }
        })

        // Optional
        Metrix.setSessionNumberListener(object : SessionNumberListener {
            override fun onSessionNumberChanged(sessionNumber: Int) {
                // Replace with your logic
                findViewById<TextView>(R.id.sessionNumTV).text = "Session Number: $sessionNumber"
            }
        })
    }
}