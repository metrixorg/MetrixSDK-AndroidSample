package ir.metrix.sample;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import ir.metrix.sdk.Metrix;

public class SecondActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        Metrix.getInstance().newEvent("Create Second Activity");
    }
}
