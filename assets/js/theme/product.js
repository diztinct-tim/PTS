/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                History.replaceState('', document.title, window.location.pathname);
            }
        });

        $("ul.productView-thumbnails > li.productView-thumbnail:first-child > a").addClass("is-active");

        $("ul.productView-thumbnails > li.productView-thumbnail > a").on("click", function(){
            $("li.productView-thumbnail > a.is-active").removeClass("is-active");
            $(this).addClass("is-active");
        });

        if( $(window).width() > 767 ){
            $(".description.pp-toggle > h3").addClass("open-tog");
            $(".description.pp-toggle > div").css("display","block");
        }

        $(".customer-reviews > h3").on("click", function(){
            $("#product-reviews").slideToggle();
        });

        $(".back-to-top").on("click", function(){
            $("body,html").animate({
                scrollTop:0
            }, 1000);
            return false;
        })

        $(".body").addClass("product-page");

        // function createCompatabilityDeskList(){
        //     var partList = $(".item-compatibility").clone();
        //     $(".desk-compatability").append(partList);
        //     $(".compatability").append(partList);
        // }
        // createCompatabilityDeskList();

        var the_clone = $(".item-compatibility").clone().addClass('cloned');
        var clone_one = the_clone.clone().addClass('clone-one');
        var clone_two = the_clone.clone().addClass('clone-two');
        $(".desk-compatability").append(clone_one);
        $(".compatability").append(clone_two);
        

        $(".productView-reviewLink").on("click", function(e){
            e.preventDefault();

            $(".customer-reviews.pp-toggle > h3").addClass("open-tog");
            $("#product-reviews").css("display","block");
            var scrollTo = $("#product-reviews").offset().top;
            console.log(scrollTo);

            $("body,html").animate({
                scrollTop: scrollTo
            }, 500);
            return false;
        });

            
        
             




    next();
    }
    // }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });


        $('.pp-toggle > h3').on('click', function(){
            $(this).toggleClass('open-tog');
            $(this).next('div').slideToggle();
        });
        $('.compatability.pp-toggle > h3').on('click', function(){
            $('.item-compatibility').slideToggle();
        });

        $('.item-compatibility > h3').on('click', function(){
            if( $(this).hasClass('open-tog') ){
                $(this).removeClass('open-tog');
                $(this).next('ul').removeClass('show-me');    
            } else {
                $('.item-compatibility ul.show-me').removeClass('show-me');
                $('.item-compatibility h3.open-tog').removeClass('open-tog');
                $(this).toggleClass('open-tog');
                $(this).next('ul').toggleClass('show-me');
            }
        });





        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
