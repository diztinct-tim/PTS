export default class PageManager {
    before(next) {
        next();

        function addBodyClass(){
            var pageName = $("h1.page-heading").text().replace(/[^A-Z0-9]/ig, "");
            $("body").addClass(pageName);
            console.log(pageName);
        }
        addBodyClass();


    }

    loaded(next) {
        next();


        if( $(window).width() <= 767 ){
            $(".start-here .button.button--primary.form-prefixPostfix-button--postfix").attr("value","GO");
        } else {
            $(".start-here .button.button--primary.form-prefixPostfix-button--postfix").attr("value","SEARCH");
        }

        $( window ).resize(function() {
          if( $(window).width() <= 767 ){
            $(".start-here .button.button--primary.form-prefixPostfix-button--postfix").attr("value","GO");
          } else {
            $(".start-here .button.button--primary.form-prefixPostfix-button--postfix").attr("value","SEARCH");
          }
        });


        $(".mobile-only.toggle-cats").on("click", function(){
            $(this).next("ul").slideToggle();
            $(this).toggleClass("open");
        });

        $(".back-to-top").on("click", function(){
            $("body,html").animate({
                scrollTop:0
            }, 1000);
            return false;
        });


    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
