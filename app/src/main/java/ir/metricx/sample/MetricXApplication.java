package ir.metricx.sample;

import android.app.Application;

import ir.metricx.analytics.MetricX;

public class MetricXApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        MetricX.initialize(this, BuildConfig.METRICX_KEY, BuildConfig.ONE_SIGNAL_KEY);
        MetricX.getInstance().setScreenFlowsAutoFill(true);
    }
}
