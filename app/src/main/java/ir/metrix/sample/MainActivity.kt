package ir.metrix.sample

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import ir.metrix.analytics.MetrixAnalytics
import ir.metrix.analytics.SessionIdListener
import ir.metrix.analytics.SessionNumberListener
import ir.metrix.analytics.messaging.RevenueCurrency
import ir.metrix.attribution.AttributionData
import ir.metrix.attribution.MetrixAttribution
import ir.metrix.attribution.OnAttributionChangeListener
import ir.metrix.attribution.UserIdListener

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Need to receive notification
        MetrixAnalytics.User.setUserCustomId("sample")

        // Optional
        MetrixAnalytics.User.setCustomAttribute("phoneNumber", "09121111111")

        // Optional
        MetrixAttribution.setUserIdListener {
            object : UserIdListener {
                override fun onUserIdReceived(userId: String) {
                    // Replace with your logic
                    findViewById<TextView>(R.id.userIdTV).text = "User ID: $userId"
                }
            }
        }

        // Optional
        MetrixAttribution.setOnAttributionChangedListener(object : OnAttributionChangeListener {
            override fun onAttributionChanged(attributionData: AttributionData) {
                // Replace with your logic
                Log.d(
                    "MetrixSample",
                    "onAttributionChanged: userAttributionStatus: ${attributionData.attributionStatus}"
                )
            }
        })

        findViewById<Button>(R.id.openWebViewBTN).setOnClickListener {
            startActivity(Intent(this, WebViewActivity::class.java))
        }

        findViewById<Button>(R.id.sendEventBTN).setOnClickListener {
            MetrixAnalytics.newEventByName(
                "androidSampleTest",
                mapOf(
                    "name" to "Ali",
                    "json" to mapOf("id" to "18y239uehwjkfdjhyu")
                )
            )
        }
        findViewById<Button>(R.id.sendRevenueBTN).setOnClickListener {
            MetrixAnalytics.newRevenueByName(
                "androidSampleTestRevenue",
                250000.0,
                RevenueCurrency.IRR
            )
        }
    }

    override fun onResume() {
        super.onResume()

        // Optional
        MetrixAnalytics.setSessionIdListener(object : SessionIdListener {
            override fun onSessionIdChanged(sessionId: String) {
                // Replace with your logic
                findViewById<TextView>(R.id.sessionIdTV).text = "Session ID: $sessionId"
            }
        })

        // Optional
        MetrixAnalytics.setSessionNumberListener(object : SessionNumberListener {
            override fun onSessionNumberChanged(sessionNumber: Int) {
                // Replace with your logic
                findViewById<TextView>(R.id.sessionNumTV).text = "Session Number: $sessionNumber"
            }
        })
    }
}