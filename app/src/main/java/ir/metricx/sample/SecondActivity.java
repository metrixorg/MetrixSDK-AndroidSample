package ir.metricx.sample;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import ir.metricx.analytics.MetricX;

public class SecondActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        MetricX.getInstance().newEvent("Create Second Activity");
    }
}
