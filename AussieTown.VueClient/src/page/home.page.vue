<template>
    <div class="container">
        <section class="header-main">
            <div class="background">
                <!--<img v-if="screenSize == 0" src="/static/images/homepage_desktop.jpg" />
                <img v-if="screenSize == 1" src="/static/images/homepage_tablet.jpg" />
                <img v-if="screenSize == 2" src="/static/images/homepage_mobile.jpg" />-->
                <img :src="backgroundImage" alt="Background Image"/>
            </div>
            <article id="typingwrapper">
                <h1 id="homepagetyping">Have a blast with real locals.</h1>
            </article>
            <article id="searchBarHomepage">
                <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)" ></searchbar>
            </article>
        </section>

        <section class="page-content" :class="{'is-home': currentPage == 'home'}">
            <ul>
                <li class="li-horizontal" v-for="listing in featuredListings">
                    <listingcard :listingDetail="listing"></listingcard>
                </li>
            </ul>

            <h1>Hello, world!</h1>
            <p>Welcome to your new single-page application, built with:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://angular.io/'>Angular 2</a> and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
            <p>To help you get started, we've also set up:</p>
            <ul>
                <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
                <li><strong>Server-side prerendering</strong>. For faster initial loading and improved SEO, your Angular 2 app is prerendered on the server. The resulting HTML is then transferred to the browser where a client-side copy of the app takes over.</li>
                <li><strong>Webpack dev middleware</strong>. In development mode, there's no need to run the <code>webpack</code> build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.</li>
                <li><strong>Hot module replacement</strong>. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, your Angular 2 app will be rebuilt and a new instance injected is into the page.</li>
                <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and the <code>webpack</code> build tool produces minified static CSS and JavaScript files.</li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import HomePage from "./home.page.ts";
export default HomePage;
</script>