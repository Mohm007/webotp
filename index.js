 fill= document.getElementById("fill");
// Detect feature support via OTPCredential availability
const verify= () => {
    console.log(123);
if ("OTPCredential" in window) {
    window.addEventListener("DOMContentLoaded", (e) => {
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      if (!input) return;
      // Set up an AbortController to use with the OTP request
      const ac = new AbortController();
      const form = input.closest("form");
      if (form) {
        // Abort the OTP request if the user attempts to submit the form manually
        form.addEventListener("submit", (e) => {
          ac.abort();
        });
      }
      // Request the OTP via get()
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          // When the OTP is received by the app client, enter it into the form
          // input and submit the form automatically
          input.value = otp.code;
          fill.innerHTML = input.value;
          if (form) form.submit();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
 }
//console.log("abc");