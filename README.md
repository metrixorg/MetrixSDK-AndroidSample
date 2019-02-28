## MetrixSDK Android Doc
[![CircleCI](https://circleci.com/gh/metrixorg/MetrixSDK-AndroidSample.svg?style=svg)](https://circleci.com/gh/metrixorg/MetrixSDK-AndroidSample)
[ ![Download](https://api.bintray.com/packages/metrixorg/maven/metrix-sdk-android/images/download.svg) ](https://bintray.com/metrixorg/maven/metrix-sdk-android/_latestVersion)
<div dir="rtl">
    
*این مطلب را در زبان‌های دیگر بخوانید: [فارسی](README.md), [English](README.en.md).*

<h2>فهرست</h2>
<a href=#project_setup>۱. تنظیمات اولیه در پروژه</a><br>
<a href=#integration>۲. راه‌اندازی و پیاده‌سازی</a><br>
<a style="padding-right:2em" href=#application_setup>۲.۱. تنظیمات اولیه در اپلیکیشن</a><br>
<a style="padding-right:2em" href=#about_application_class>۲.۲. در مورد کلاس اپلیکیشن و initialize کردن در این کلاس</a><br>
<a href=#methods>۳. امکانات کتابخانه متریکس</a><br>
<a style="padding-right:2em" href=#session_event_description>۳.۱. توضیح مفاهیم رویداد (event) و نشست (session)</a><br>
<a style="padding-right:2em" href=#enableLocationListening>۳.۲. ثبت اطلاعات مربوط به مکان</a><br>
<a style="padding-right:2em" href=#setEventUploadThreshold>۳.۳. سقف تعداد رویدادهای ارسالی</a><br>
<a style="padding-right:2em" href=#setEventUploadMaxBatchSize>۳.۴. حداکثر تعداد رویدادی ارسالی هر درخواست</a><br>
<a style="padding-right:2em" href=#setEventMaxCount>۳.۵. تعداد حداکثر ذخیره رویداد در مخزن کتابخانه</a><br>
<a style="padding-right:2em" href=#setEventUploadPeriodMillis>۳.۶. بازه زمانی ارسال رویدادها</a><br>
<a style="padding-right:2em" href=#setSessionTimeoutMillis>۳.۷. بازه زمانی دلخواه برای نشست‌ها</a><br>
<a style="padding-right:2em" href=#setOptOut>۳.۸. دستور عمل نکردن کل کتابخانه</a><br>
<a style="padding-right:2em" href=#enableLogging>۳.۹. مدیریت لاگ‌ها</a><br>
<a style="padding-right:2em" href=#setLogLevel>۳.۱۰. تعیین LogLevel</a><br>
<a style="padding-right:2em" href=#setOffline>۳.۱۱. حالت آفلاین</a><br>
<a style="padding-right:2em" href=#setFlushEventsOnClose>۳.۱۲. ارسال همه‌ی رویدادها</a><br>
<a style="padding-right:2em" href=#getSessionNum>۳.۱۳. شماره نشست جاری</a><br>
<a style="padding-right:2em" href=#newEvent>۳.۱۴. رویداد سفارشی</a><br>
<a style="padding-right:2em" href=#setUserAttributes>۳.۱۵. مشخص کردن Attribute‌های پیش‌فرض همه‌ی رویدادها</a><br>
<a style="padding-right:2em" href=#setUserMetrics>۳.۱۶. مشخص کردن Metricsهای پیش‌فرض همه‌ی رویدادها</a><br>
<a style="padding-right:2em" href=#setScreenFlowsAutoFill>۳.۱۷. فعال کردن فرآیند نگهداری حرکت کاربر بین صفحات مختلف در اپلیکیشن</a><br>
<a style="padding-right:2em" href=#isScreenFlowsAutoFill>۳.۱۸. اطلاع یافتن از مقدار screenFlow</a><br>
<a style="padding-right:2em" href=#setAttributionListener>۳.۱۹. دریافت اطلاعات کمپین</a><br>
<a style="padding-right:2em" href=#setDefaultTracker>۳.۲۰. مشخص کردن Pre-installed Tracker</a><br>



<h2 id=project_setup> تنظیمات اولیه در پروژه</h2>

۱. ابتدا تنظیمات زیر را در قسمت `repositories` فایل `gradle` کل پروژه اضافه کنید:

<div dir="ltr">

    allprojects{
        repositories {

        ...

            maven {
                url 'https://dl.bintray.com/metrixorg/maven'
            }
        }
    }
</div>

۲. کتاب خانه زیر را در قسمت `dependencies` فایل `gradle` اپلیکیشن خود اضافه کنید:
<div dir="ltr">

    implementation 'ir.metrix:metrix:0.8.0'
</div>

۳. آپشن زیر را به بلاک `android` فایل `gradle` اپلیکیشن خود اضافه کنید:

<div dir="ltr">

    compileOptions {
        targetCompatibility = "8"
        sourceCompatibility = "8"
    }
</div>


۴. تنظیمات زیر را به `Proguard` پروژه خود اضافه کنید:

<div dir=ltr>

    -keepattributes Signature
    -keepattributes *Annotation*
    -keepattributes EnclosingMethod
    -keepattributes InnerClasses

    -keepclassmembers enum * { *; }
    -keep class **.R$* { *; }
    -keep interface ir.metrix.sdk.NoProguard
    -keep class * implements ir.metrix.sdk.NoProguard { *; }
    -keep interface * extends ir.metrix.sdk.NoProguard { *; }

    # retrofit
    # Retain service method parameters when optimizing.
    -keepclassmembers,allowshrinking,allowobfuscation interface * {
        @retrofit2.http.* <methods>;
    }

    # Ignore JSR 305 annotations for embedding nullability information.
    -dontwarn javax.annotation.**

    # Guarded by a NoClassDefFoundError try/catch and only used when on the classpath.
    -dontwarn kotlin.Unit

    # Top-level functions that can only be used by Kotlin.
    -dontwarn retrofit2.-KotlinExtensions

    # With R8 full mode, it sees no subtypes of Retrofit interfaces since they are created with a Proxy
    # and replaces all potential values with null. Explicitly keeping the interfaces prevents this.
    -if interface * { @retrofit2.http.* <methods>; }
    -keep,allowobfuscation interface <1>

    #OkHttp
    # A resource is loaded with a relative path so the package of this class must be preserved.
    -keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

    # Animal Sniffer compileOnly dependency to ensure APIs are compatible with older versions of Java.
    -dontwarn org.codehaus.mojo.animal_sniffer.*

    # OkHttp platform used only on JVM and when Conscrypt dependency is available.
    -dontwarn okhttp3.internal.platform.ConscryptPlatform



    #Gson
    # Gson specific classes
    -dontwarn sun.misc.**
    #-keep class com.google.gson.stream.** { *; }

    # Prevent proguard from stripping interface information from TypeAdapterFactory,
    # JsonSerializer, JsonDeserializer instances (so they can be used in @JsonAdapter)
    -keep class * implements com.google.gson.TypeAdapterFactory
    -keep class * implements com.google.gson.JsonSerializer
    -keep class * implements com.google.gson.JsonDeserializer

    #referral
    -keep public class com.android.installreferrer.** { *; }

</div>

۵. برای کتابخانه `Metrix` لازم است تا دسترسی‌های زیر را به فایل `AndroidManifest.xml` اضافه کنید:

<div dir=ltr>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /> <!--optional-->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> <!--optional-->
</div>

(دو permission دوم اختیاری است)

<h2 id=integration>راه‌اندازی و پیاده‌سازی sdk در اپلیکیشن اندروید:</h2>

<h3 id=application_setup>تنظیمات اولیه در اپلیکیشن:</h3>

باید کتابخانه متریکس را در کلاس `Application` اندروید `initialize` کنید. اگر از قبل در پروژه خود کلاس `Application` ندارید به شکل زیر این کلاس را ایجاد کنید:<br>
۱. یک کلاس ایجاد کنید که از کلاس `Application` را ارث بری کند:<br>

<img src="https://storage.backtory.com/tapsell-server/metrix/doc/screenshots/Metrix-Application-Class.png"/>

۲. فایل `AndriodManifest.xml` اپلیکیشن خود را باز کنید و به تگ `<application>` بروید.<br>
۳. با استفاده از `Attribute` زیر کلاس `Application` خود را در `AndroidManifest.xml` اضافه کنید:<br>

<div dir=ltr>

    <application
        android:name=“.MyApplication”
        ... >

    </application>
</div>

<img src="https://storage.backtory.com/tapsell-server/metrix/doc/screenshots/Metrix-Application-Manifest.png">

۴. در متد `onCreate` کلاس `Application` خود، مطابق قطعه کد زیر sdk متریکس را `initialize` کنید:<br>
<div dir=ltr>

    import ir.metrix.analytics.Metrix;

    public class MyApplication extends Application {

        @Override
        public void onCreate() {
            super.onCreate();
            Metrix.initialize(this, “app id”);
        }
    }
</div>

`APP_ID`: کلید اپلیکیشن شما که از پنل متریکس آن را دریافت می‌کنید.

<h3 id=about_application_class>در مورد کلاس اپلیکیشن و initialize کردن در این کلاس</h3>

اندروید در کلاس اپلیکیشن به توسعه دهنده این اختیار را می‌دهد که قبل از ساخته شدن هر `Activity` در اپلیکیشن دستوراتی را وارد کند. این موضوع برای کتابخانه متریکس نیز ضروری است، به این دلیل که شمردن `session`ها و همچنین جریان بین `Activity`ها و دیگر امکانات کارایی لازم را داشته باشند و به درستی عمل کنند.

<h2 id=methods>امکانات کتابخانه متریکس</h2>

<h3 id=session_event_description>۱. توضیح مفاهیم رویداد (event) و نشست (session)</h3>
در هر تعاملی که کاربر با اپلیکیشن دارد، کتابخانه متریکس این تعامل را در قالب یک <b>رویداد</b> برای سرور ارسال می‌کند. تعریف کتابخانه متریکس از یک <b>نشست</b>، بازه زمانی مشخصی است که کاربر با اپلیکیشن در تعامل است.<br>
<br>
در کتابخانه متریکس سه نوع رویداد داریم:<br>
<b>۱. شروع نشست (session_start):</b> زمان شروع یک نشست.<br>
<b>۲. پایان نشست (session_stop):‌</b> زمان پایان یک نشست.<br>
<b>۳. سفارشی (custom):</b> وابسته به منطق اپلیکیشن شما و تعاملی که کاربر با اپلیکیشن شما دارد می‌توانید رویدادهای سفارشی خود را در قالبی که در ادامه شرح داده خواهد شد بسازید و ارسال کنید.<br>

<b>نکته:</b> برای استفاده از امکانات کتابخانه و صدا زدن متدهایی که کتابخانه در اختیار شما می‌گذارد باید `MetrixClient` را با استفاده از متد `getInstance` دریافت کنید و در ادامه متد مدنظر خود را صدا بزنید.<br>
<br>

<h3 id=enableLocationListening>۲. فعال یا غیرفعال کردن ثبت اطلاعات مکان کاربر در رویدادها</h3>
می‌توانید با استفاده از دو تابع زیر به کتابخانه متریکس اعلام کنید که در رویدادها اطلاعات مربوط به مکان کاربر را به همراه دیگر اطلاعات ارسال کند یا نکند. (برای اینکه این متد به درستی عمل کند دسترسی‌های اختیاری که بالاتر ذکر شد باید فعال باشند)<br>
<div dir=ltr>

    Metrix.getInstance().enableLocationListening();

    Metrix.getInstance().disableLocationListening();
</div>

<h3 id=setEventUploadThreshold>۳. تعیین سقف تعداد رویدادها برای ارسال به سمت سرور</h3>
با استفاده از تابع زیر می‌توانید مشخص کنید که هر موقع تعداد رویدادهای ذخیره شده شما به تعداد مورد نظر شما رسید کتابخانه رویدادها را برای سرور ارسال کند:<br>
<div dir=ltr>

    Metrix.getInstance().setEventUploadThreshold(50);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه ۳۰ رویداد است.)<br>

<h3 id=setEventUploadMaxBatchSize>۴. تعیین حداکثر تعداد رویداد ارسالی در هر درخواست</h3>
با استفاده از این تابع می‌توانید حداکثر تعداد رویداد ارسالی در هر درخواست را به شکل زیر مشخص کنید:<br>
<div dir=ltr>

    Metrix.getInstance().setEventUploadMaxBatchSize(100);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه ۱۰۰ رویداد است.)<br>

<h3 id=setEventMaxCount>۵. تعیین تعداد حداکثر ذخیره رویداد در مخزن کتابخانه</h3>
با استفاده از تابع زیر می‌توانید مشخص کنید که حداکثر تعداد رویدادهای ذخیر شده در کتابخانه متریکس چقدر باشد (به عنوان مثال اگر دستگاه کاربر اتصال خود به اینترنت را از دست داد رویدادها تا مقداری که شما مشخص می‌کنید در کتابخانه ذخیره خواهند شد) و اگر تعداد رویدادهای ذخیره شده در کتابخانه از این مقدار بگذرد رویدادهای قدیمی توسط sdk نگهداری نشده و از بین می‌روند:<br>
<div dir=ltr>

    Metrix.getInstance().setEventMaxCount(1000);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه ۱۰۰۰ رویداد است.)<br>

<h3 id=setEventUploadPeriodMillis>۶. تعیین بازه زمانی ارسال رویدادها به سمت سرور</h3>
با استفاده از این تابع می‌توانید مشخص کنید که درخواست آپلود رویدادها بعد از گذشت چند میلی‌ثانیه فرستاده شود:<br>
<div dir=ltr>

    Metrix.getInstance().setEventUploadPeriodMillis(30000);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه ۳۰ ثانیه است.)<br>

<h3 id=setSessionTimeoutMillis>۷. تعیین بازه زمانی دلخواه برای نشست‌ها</h3>
با استفاده از این تابع می‌توانید حد نشست‌ها را در اپلیکیشن خود مشخص کنید که هر نشست حداکثر چند ثانیه محاسبه شود. به عنوان مثال اگر مقدار این تابع را ۱۰۰۰۰ وارد کنید اگر کاربر در اپلیکیشن ۷۰ ثانیه تعامل داشته باشد، کتابخانه متریکس این تعامل را ۷ نشست محاسبه می‌کند.<br>
<div dir=ltr>

    Metrix.getInstance().setSessionTimeoutMillis(1800000);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه ۳۰ دقیقه است.)<br>

<h3 id=setOptOut>۸. دستور عمل نکردن کل کتابخانه</h3>
با استفاده از این تابع می‌توانید به کتابخانه دستور بدهید که هیچ رویدادی را ثبت نکند:<br>
<div dir=ltr>

    Metrix.getInstance().setOptOut(true);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه false است.)<br>

<h3 id=enableLogging>۹. فعال کردن مدیریت لاگ‌ها کتابخانه متریکس</h3>
توجه داشته باشید که موقع release اپلیکیشن خود مقدار این تابع را false قرار دهید:<br>
<div dir=ltr>

    Metrix.getInstance().enableLogging(true);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه true است.)<br>

<h3 id=setLogLevel>۱۰. تعیین LogLevel</h3>

با استفاده از این تابع می‌توانید مشخص کنید که چه سطحی از لاگ‌ها در `logcat` چاپ شود، به عنوان مثال دستور زیر همه‌ی سطوح لاگ‌ها به جز `VERBOSE` در `logcat` نمایش داده شود:<br>
<div dir=ltr>

    Metrix.getInstance().setLogLevel(Log.DEBUG);
</div>

(مقدار پیش‌فرض این تابع در کتابخانه `Log.INFO` است.)<br>

<h3 id=setOffline>۱۱. روشن کردن حالت آفلاین کتابخانه</h3>
با استفاده از این تابع کتابخانه رویدادها را برای سرور ارسال نمی‌کند اما همچنان رویدادها را با تنظیمات دلخواه شما ثبت می‌کند:<br>
<div dir=ltr>

    Metrix.getInstance().setOffline(true);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه false است.)<br>

<h3 id=setFlushEventsOnClose>۱۲. فعال یا غیرفعال کردن ارسال همه‌ی رویدادها</h3>
با استفاده از این تابع می‌توانید مشخص کنید که زمانی که اپلیکیشن بسته می‌شود همه رویدادهای ذخیره شده در کتابخانه ارسال شود یا نشود:<br>
<div dir=ltr>

    Metrix.getInstance().setFlushEventsOnClose(false);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه true است.)<br>

<h3 id=getSessionNum>۱۳. اطلاع یافتن از شماره نشست جاری</h3>
با استفاده از این تابع می‌توانید از شماره نشست (session)  جاری اطلاع پیدا کنید:<br>
<div dir=ltr>

    Metrix.getInstance().getSessionNum();
</div>

<h3 id=newEvent>۱۴. ساختن یک رویداد سفارشی</h3>
با استفاده از این تابع می‌توانید یک رویداد سفارشی بسازید. برای این کار شما در ابتدا باید در داشبورد متریکس از قسمت مدیریت رخدادها، رخداد موردنظر خود را ثبت کنید و نامک (slug) آن را بعنوان نام رخداد در sdk استفاده کنید.<br>
این تابع را به دو صورت می‌توانید صدا بزنید:<br>
۱. یک رویداد سفارشی که فقط یک اسم مشخص دارد بسازید:<br>

<div dir=ltr>

    Metrix.getInstance().newEvent(“my_event_slug");
</div>

ورودی این تابع از جنس String است<br>
<br>

۲. یک رویداد سفارشی با تعداد دلخواه attribute و metric خاص سناریو خود بسازید، به عنوان مثال فرض کنید در یک برنامه خرید آنلاین می‌خواهید یک رویداد سفارشی بسازید:<br>

<div dir=ltr>

    Map<String, String> attributes = new HashMap<>();
    attributes.put("first_name", "Ali");
    attributes.put("last_name", "Bagheri");
    attributes.put("manufacturer", "Nike");
    attributes.put("product_name", "shirt");
    attributes.put("type", "sport");
    attributes.put("size", "large");

    Map<String, Object> metrics = new HashMap<>();
    metrics.put("price", 100000);
    metrics.put("purchase_time", current_time);

    Metrix.getInstance().newEvent("purchase_event_slug", attributes, metrics);
</div>

ورودی‌های متد newEvent بدین شرح هستند:<br>
- <b>ورودی اول:</b> نامک رویداد مورد نظر شما که از جنس String است و آن را از داشبورد متریکس دریافت می‌کنید.<br>
- <b>ورودی دوم:</b> یک Map<String, String> که ویژگی‌های یک رویداد را مشخص می‌کند.<br>
- <b>ورودی سوم:</b> یک Map<String, Object> که شامل ویژگی‌های قابل اندازه گیری هستند. مقادیر پشتیبانی شده در کتابخانه متریکس یکی از مقادیر <br>زیر است:
    1. Integer
    2. Float
    3. Double
    4. Long
    5. Sting
    6. Boolean

<h3 id=setUserAttributes>۱۵. مشخص کردن Attribute‌های پیش‌فرض همه‌ی رویدادها</h3>

با استفاده از این تابع می‌توانید به تعداد دلخواه `Attribute` به همه‌ی رویدادهای خود اضافه کنید:<br>
<div dir=ltr>

    Map<String, String> attributes = new HashMap<>();
    attributes.put("manufacturer", "Nike");

    Metrix.getInstance().addUserAttributes(attributes);
</div>

<h3 id=setUserMetrics>۱۶. مشخص کردن Metricsهای پیش‌فرض همه‌ی رویدادها</h3>

با استفاده از این تابع می‌توانید به تعداد دلخواه `Metric` به همه‌ی رویدادهای خود اضافه کنید:<br>
<div dir=ltr>

    Map<String, Object> metrics = new HashMap<>();
    metrics.put("purchase_time", current_time);

    Metrix.getInstance().setUserMetrics(metrics);
</div>

<h3 id=setScreenFlowsAutoFill>۱۷. فعال کردن فرآیند نگهداری حرکت کاربر بین صفحات مختلف در اپلیکیشن</h3>

با استفاده از این تابع می‌توانید به کتابخانه متریکس اطلاع بدهید که تشخیص بدهد کاربر از کدام `Activity`/`Fragment` به کدام `Activity`/`Fragment` می‌رود و این داده‌ها را به صورت اتوماتیک ذخیره کند:<br>
<div dir=ltr>

    Metrix.getInstance().setScreenFlowsAutoFill(true);
</div>
(مقدار پیش‌فرض این تابع در کتابخانه false است.)<br>

<h3 id=isScreenFlowsAutoFill>۱۸. اطلاع یافتن از مقدار screenFlow در کتابخانه</h3>
با استفاده از این تابع می‌توانید متوجه شوید که مقدار `screenFlow` در کتابخانه متریکس چیست:<br>
<div dir=ltr>

    Metrix.getInstance().isScreenFlowsAutoFill();
</div>

<h3 id=setAttributionListener>۱۹. دریافت اطلاعات کمپین</h3>

با مقداردهی این تابعه میتوانید اطلاعات کمپین تبلیغاتی که در ترکر خود در پنل قرار داده اید را دریافت کنید.<br>
<div dir=ltr>

    Metrix.getInstance().setOnAttributionChangedListener(new OnAttributionChangedListener() {
    @Override
      public void onAttributionChanged(AttributionModel attributionModel) {
          //TODO
        }
    });
</div>

مدل `AttributionModel` اطلاعات زیر را در اختیار شما قرار میدهد.

`attributionModel.getAcquisitionAd()` : نام تبلیغ

`attributionModel.getAcquisitionAdSet()`: گروه تبلیغاتی

`attributionModel.getAcquisitionCampaign()`: کمپین تبلیغاتی

`attributionModel.getAcquisitionSource()`: شبکه تبلیغاتی

`attributionModel.getAttributionStatus()`: وضعیت کاربر در کمپین را
مشخص میکند و فقط چهار مقدار زیر را برمیگرداند

۱- `ATTRIBUTED` اتربیوت شده

۲- `NOT_ATTRIBUTED_YET` هنوز اتربیوت نشده

۳- `ATTRIBUTION_NOT_NEEDED` نیاز به اتربیوت ندارد

۴- `UNKNOWN` حالت ناشناخته



<h3 id=setDefaultTracker>۲۰. مشخص کردن Pre-installed Tracker</h3>

با استفاده از این تابع می‌توانید با استفاده از یک `trackerToken` که از پنل آن را دریافت می‌کنید، برای همه‌ی رویدادها یک `tracker` پیش‌فرض را قرار دهید:<br>
<div dir=ltr>

    Metrix.getInstance().setDefaultTracker(trackerToken);
</div>


</div>
