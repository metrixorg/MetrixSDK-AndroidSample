# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in C:\Android\sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Tapsell Metrix
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepattributes InnerClasses
# Gson specific classes
-keep class sun.misc.Unsafe { *; }
-keep class ir.metrix.analytics.gson.stream.** { *; }
-keep class ir.metrix.analytics.gson.** { *; }
-dontwarn sun.misc.**

-keepclassmembers enum * { *; }
-keep class **.R$* { *; }
-keep interface ir.metrix.analytics.NoProguard
-keep class * implements ir.metrix.analytics.NoProguard { *; }
-keep interface * extends ir.metrix.analytics.NoProguard { *; }
# End of Tapsell Metrix

-dontwarn com.android.installreferrer.api.**

-keep public class com.android.installreferrer.** { *; }
