let EASOF = {
  options: {
    form: '#order-form',
    finalBtn: '#final-button',
    username: "#username",
    email: "#email",
    password: "#password",
    gender: "#gender",
    search_gender: "#search_gender",
    orientation: "#orientation",
    age: "#age",
    device: "#device",
    lang: "",
    countryParam: "country",
    token1Param: "s3",
    token2Param: "s5",
    successCallback: function () {},
    errorCallback: function () {},
  },
  init: function(options) {
    let that = this;
    for (let prop in options) {
      if (that.options.hasOwnProperty(prop) && options[prop] !== '') {
        that.options[prop] = options[prop];
      }
    }
    $(this.options.finalBtn).on('click', function () {
      $(this).addClass('disable');
      $(this).prop('disabled', true);
      let post = that.getFormData();
      that.apiCall('/apicall.php', post);
    });
  },
  getUrlParam: function(url, pname) {
    let pVal = '';
    const urlParts = url.substring(url.indexOf('?')+1).split('&');
    if (!urlParts.length) {
      return pval;
    }
    for (let k in urlParts) {
      let part = urlParts[k].split('=');
      if (part.length !== 2) {
        continue;
      }
      let p = decodeURIComponent(part[0]);
      if (p !== pname) {
        continue;
      }
      pVal = decodeURIComponent(part[1]);
      break;
    }
    return pVal;
  },
  getFormData: function() {
    return {
        ua: window.navigator.userAgent,
        username: this.getUsername(),
        lang: this.options.lang,
        token_1: this.getToken1(),
        token_2: this.getToken2(),
        country: this.getCountry(),
        email: this.getEmail(),
        password: this.getPassword(),
        gender: this.getGender(),
        search_gender: this.getSearchGender(),
        orientation: this.getOrientation(),
        age: this.getAge(),
        device: this.getDevice()
    }
  },
    getUsername: function () {
        return $(this.options.username).val();
    },
    getEmail: function () {
        return $(this.options.email).val();
    },
    getPassword: function () {
        return $(this.options.password).val();
    },
    getGender: function () {
        return $(this.options.gender).val();
    },
    getSearchGender: function () {
        return $(this.options.search_gender).val();
    },
    getAge: function () {
        return $(this.options.orientation).val();
    },
    getOrientation: function () {
        return $(this.options.age).val();
    },
    getDevice: function () {
        return $(this.options.device).val();
    },
    getToken1: function () {
        return this.getUrlParam(location.href, this.options.token1Param);
    },
    getToken2: function () {
        return this.getUrlParam(location.href, this.options.token2Param);
    },
    getCountry: function () {
        return this.getUrlParam(location.href, this.options.countryParam);
    },
  apiCall: function(url, post) {
    let that = this;
    $.ajax({
        url: url,
        type: 'POST',
        data: post,
        dataType: 'JSON',
        success: function (data) {
          if (data.status && (data.status === 'success') && !!data.url) {
            // OK
              document.location.href = data.url;
          } else {
            // Error
              that.options.errorCallback();
          }
        }
      }
    );
  },
};

document.addEventListener("DOMContentLoaded",function () {
  if (typeof apiConf !== "undefined" && apiConf !== null && typeof apiConf === "object") {
    EASOF.init(apiConf);
  } else {
    EASOF.init({});
  }
});
