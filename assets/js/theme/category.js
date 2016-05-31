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

        if( $('ul.breadcrumbs li').length == 3 ){
            if(catName == "black-decker"){
                $(".page").addClass("model-list");
                $(".page").append("<div class='model-catalog'><a href=''><img src='https://cdn3.bigcommerce.com/s-p3ubwr6cgq/product_images/uploaded_images/model-no-catalog-05.png'></a></div>");
                $(".sidebarBlock-heading").text("Select Your Model Number Below:");
            } else if(catName == "dewalt"){
                $(".page").addClass("model-list");
                $(".page").append("<div class='model-catalog'><a href=''><img src='https://cdn3.bigcommerce.com/s-p3ubwr6cgq/product_images/uploaded_images/model-no-catalog-05.png'></a></div>");
                $(".sidebarBlock-heading").text("Select Your Model Number Below:");
            } else if(catName == "porter-cable"){
                $(".page").addClass("model-list");
                $(".page").append("<div class='model-catalog'><a href=''><img src='https://cdn3.bigcommerce.com/s-p3ubwr6cgq/product_images/uploaded_images/model-no-catalog-05.png'></a></div>");
                $(".sidebarBlock-heading").text("Select Your Model Number Below:");
            } else if(catName == "bostitch"){
                $(".page").addClass("model-list");
                $(".page").append("<div class='model-catalog'><a href=''><img src='https://cdn3.bigcommerce.com/s-p3ubwr6cgq/product_images/uploaded_images/model-no-catalog-05.png'></a></div>");
                $(".sidebarBlock-heading").text("Select Your Model Number Below:");
            }
        }

        if( $('ul.breadcrumbs li').length == 2 ){
            if(pageURL == "black-decker" || pageURL == "dewalt" || pageURL == "porter-cable" || pageURL == "bostitch"){
            // if( pageURL == "black-decker" || pageURL == "porter-cable"){
                $(".body").addClass("brand-landing-page");
            }
        }

        $(".back-to-top").on("click", function(){
            $("body,html").animate({
                scrollTop:0
            }, 1000);
            return false;
        })







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
