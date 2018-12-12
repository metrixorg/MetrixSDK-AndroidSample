package ir.metrix.sample;

import android.app.Application;

import ir.metrix.analytics.Metrix;

public class MetrixApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Metrix.initialize(this, BuildConfig.METRIX_KEY);
        Metrix.getInstance().setScreenFlowsAutoFill(true);
    }
}
