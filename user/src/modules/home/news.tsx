import { Page } from 'site';
import { StationService, imageUrl, News } from 'services';
import * as ui from 'core/ui';
import * as site from 'site';

import Vue = require('vue');

export default function (page: Page) {
    let station = page.createService(StationService);
    let id = page.routeData.values.id;
    console.assert(id);
    station.news(id).then(news => {
        let vm = new Vue({
            el: page.dataView,
            data: {
                news
            },
            render(h) {
                let news: News = this.news;
                return (
                    <section class="main container">
                        <h2>{news.Title}</h2>
                        <div class="small">
                            {news.Date}
                        </div>
                        <div domProps-innerHTML={news.Content}>
                        </div>
                    </section>
                );
            },
            mounted() {
                let self = this as VueInstance<any>;
                let imgs = self.$el.querySelectorAll('img');
                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].src = imageUrl(imgs[i].src);
                    ui.imageDelayLoad(imgs[i], site.config.imageText);
                }
            }
        })

        page.loadingView.style.display = 'none';
    });

    createHeader(page);
}

function createHeader(page: Page) {
    new Vue({
        el: page.header,
        render(h) {
            return (
                <header>
                    <nav class="bg-primary" style="width:100%;">
                        <button onclick="app.back()" class="leftButton">
                            <i class="icon-chevron-left"></i>
                        </button>
                        <h4>资讯详情</h4>
                    </nav>
                </header>
            );
        }
    })
}