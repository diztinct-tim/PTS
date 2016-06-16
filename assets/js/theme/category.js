import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';

export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('.body').addClass("category-page");

        // injected from category.html
        // console.log(this.context.currentPage);

        var pageURL = this.context.currentPage;
        var pageURL = pageURL.replace(/\//g," ").replace("http:","").replace("power-tool-superstore9.mybigcommerce.com","").replace("powertoolsuperstore.com","").trim();
        var catName = pageURL.substr(0,pageURL.indexOf(' '));

        console.log('pageURL = ' + pageURL);
        console.log('catName = ' + catName);
        console.log($('ul.breadcrumbs li').length);

        var catImg = $(".cat-img").attr("src");

        if( $('ul.breadcrumbs li').length == 3 ){
            if(catName == "black-decker"){
                if($(".cat-img").length){
                    $(".page").addClass("model-list");
                    $(".cat-img").hide();
                    $(".page").append("<div class='model-wrap'><div class='model-catalog' data-reveal-id='myModal'><a href='#'><img class='i-img' src='https://store-p3ubwr6cgq.mybigcommerce.com/product_images/uploaded_images/i-img.jpg'><span>Where is my model number?</span><img class='popup-click' src=" + catImg + "></a><span class='click-larger'>Click to view larger</span></div></div>");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                } else {
                    $(".page").addClass("model-list");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                    // make page full width
                    $(".page-sidebar.cf.Left").addClass("full-width");
                }
            } else if(catName == "dewalt"){
               if($(".cat-img").length){
                    $(".page").addClass("model-list");
                    $(".cat-img").hide();
                    $(".page").append("<div class='model-wrap'><div class='model-catalog' data-reveal-id='myModal'><a href='#'><img class='i-img' src='https://store-p3ubwr6cgq.mybigcommerce.com/product_images/uploaded_images/i-img.jpg'><span>Where is my model number?</span><img class='popup-click' src=" + catImg + "></a><span class='click-larger'>Click to view larger</span></div></div>");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                } else {
                    $(".page").addClass("model-list");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                    // make page full width
                    $(".page-sidebar.cf.Left").addClass("full-width");
                }
            } else if(catName == "porter-cable"){
                if($(".cat-img").length){
                    $(".page").addClass("model-list");
                    $(".cat-img").hide();
                    $(".page").append("<div class='model-wrap'><div class='model-catalog' data-reveal-id='myModal'><a href='#'><img class='i-img' src='https://store-p3ubwr6cgq.mybigcommerce.com/product_images/uploaded_images/i-img.jpg'><span>Where is my model number?</span><img class='popup-click' src=" + catImg + "></a><span class='click-larger'>Click to view larger</span></div></div>");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                } else {
                    $(".page").addClass("model-list");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                    // make page full width
                    $(".page-sidebar.cf.Left").addClass("full-width");
                }
            } else if(catName == "bostitch"){
               if($(".cat-img").length){
                    $(".page").addClass("model-list");
                    $(".cat-img").hide();
                    $(".page").append("<div class='model-wrap'><div class='model-catalog' data-reveal-id='myModal'><a href='#'><img class='i-img' src='https://store-p3ubwr6cgq.mybigcommerce.com/product_images/uploaded_images/i-img.jpg'><span>Where is my model number?</span><img class='popup-click' src=" + catImg + "></a><span class='click-larger'>Click to view larger</span></div></div>");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                } else {
                    $(".page").addClass("model-list");
                    $(".sidebarBlock-heading").text("Select Your Model Number Below:");
                    $(".brand-img").each(function(){
                        $(this).addClass(catName);
                    });
                    // make page full width
                    $(".page-sidebar.cf.Left").addClass("full-width");
                }       
            }
        }

        if( $('ul.breadcrumbs li').length == 2 ){
            if(pageURL == "black-decker" || pageURL == "dewalt" || pageURL == "porter-cable" || pageURL == "bostitch"){
                $(".body").addClass("brand-landing-page");
            }
        }

        $(".back-to-top").on("click", function(){
            $("body,html").animate({
                scrollTop:0
            }, 1000);
            return false;
        })

        $(".model-catalog").on("click", function(e){
            e.preventDefault();
            var imgPopup = $(this).find(".popup-click").attr("src");
            console.log(imgPopup);
            $(".popup-src").attr("src", imgPopup );
        })

        if( $(window).width() < 768){
            $(".landing-search #search_query_adv").attr("placeholder","Search By Model #");
        } else {
            $(".landing-search #search_query_adv").attr("placeholder","Search By Model Number");
        }

    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
}
