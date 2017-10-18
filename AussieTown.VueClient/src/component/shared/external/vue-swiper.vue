<template>
    <div class="swipe-wrapper">
        <div class="slide-button-prev is-hidden-mobile" v-if="showNavButton" v-show="currentPage > 1" @click.prevent="prev">
            <i class="icon icon-left-open-big"></i>
        </div>
        <div class="swiper"
             :class="[direction, {'dragging': dragging}]"
             @touchstart.prevent="_onTouchStart"
             @mousedown="_onTouchStart"
             @wheel.prevent="_onWheel">
            <div class="swiper-slide"
                 ref="wrap"
                 :style="{
                'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
                'transition-duration': transitionDuration + 'ms'
             }"
                 @transitionend="_onTransitionEnd">
                <slot></slot>
                <div name="EndOfSlide" style="width: 1px; height: 1px;"></div>
            </div>
            <div class="swiper-pagination"
                 v-show="paginationVisible">
                <span class="swiper-pagination-bullet"
                      :class="{'active': index+1===currentPage}"
                      v-for="(slide,index) in slideEls"
                      @click="paginationClickable && setPage(index+1)"></span>
            </div>
        </div>
        <div class="slide-button-next is-hidden-mobile" v-if="showNavButton" v-show="isNextAvailable()" @click.prevent="next">
            <i class="icon icon-right-open-big"></i>
        </div>
    </div>
</template>
<script>
    import { Utils } from '../../utils';
    const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';

    export default {
        props: {
            direction: {
                type: String,
                default: VERTICAL,
                validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
            },
            mousewheelControl: {
                type: Boolean,
                default: true
            },
            performanceMode: {
                type: Boolean,
                default: false
            },
            paginationVisible: {
                type: Boolean,
                default: false
            },
            paginationClickable: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
                default: false
            },
            speed: {
                type: Number,
                default: 500
            },
            slideWidth: {
                type: Number,
                default: 300
            },
            showNavButton: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentPage: 1,
                lastPage: 1,
                translateX: 0,
                translateY: 0,
                startTranslate: 0,
                delta: 0,
                dragging: false,
                startPos: null,
                transitioning: false,
                slideEls: [],
                translateOffset: 0,
                transitionDuration: 0
            };
        },
        mounted: function () {
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            //console.log("inside comp:" + this.$refs.swiperWrap);
            this.slideEls = [].map.call(this.$refs.wrap.children, el => el);
            if (this.loop) {
                this.$nextTick(function () {
                    this._createLoop();
                    this.setPage(this.currentPage, true);
                });
            } else {
                this.setPage(this.currentPage);
            }
        },
        methods: {
            next() {
                var page = this.currentPage;
                if (this.isNextAvailable() || this.loop) {
                    this.setPage(page + 1);
                } else {
                    this._revert();
                }
            },
            prev() {
                var page = this.currentPage;
                if (page > 1 || this.loop) {
                    this.setPage(page - 1);
                } else {
                    this._revert();
                }
            },
            refresh(){
                this.slideEls = [].map.call(this.$refs.wrap.children, el => el);
                var translateName = this.isHorizontal() ? 'translateX' : 'translateY';
                this[translateName] = 0;

                this.setPage(this.currentPage);
            },
            setPage(page, noAnimation) {
                var self = this;
                this.lastPage = this.currentPage;
                if (page === 0) {
                    this.currentPage = this.slideEls.length;
                } else if (page === this.slideEls.length + 1) {
                    this.currentPage = 1;
                } else {
                    this.currentPage = page;
                }

                if (this.loop) {
                    if (this.delta === 0) {
                        this._setTranslate(self._getTranslateOfPage(this.lastPage));
                    }
                    setTimeout(function () {
                        self._setTranslate(self._getTranslateOfPage(page));
                        if (noAnimation) return;
                        self._onTransitionStart();
                    }, 0);
                } else {
                    this._setTranslate(this._getTranslateOfPage(page));
                    if (noAnimation) return;
                    this._onTransitionStart();
                }
            },
            isNextAvailable(){
                if (this.$refs.wrap){
                    return !Utils.isElementInViewport(this.$refs.wrap.lastElementChild);
                }
                
                return true;
            },
            isHorizontal() {
                return this.direction === HORIZONTAL;
            },
            isVertical() {
                return this.direction === VERTICAL;
            },
            _onTouchStart(e) {
                this.startPos = this._getTouchPos(e);
                this.delta = 0;
                this.startTranslate = this._getTranslateOfPage(this.currentPage);
                this.startTime = new Date().getTime();
                this.dragging = true;
                this.transitionDuration = 0;

                document.addEventListener('touchmove', this._onTouchMove, {passive: true});
                document.addEventListener('touchend', this._onTouchEnd, false);
                document.addEventListener('mousemove', this._onTouchMove, false);
                document.addEventListener('mouseup', this._onTouchEnd, false);
            },
            _onTouchMove(e) {
                this.delta = this._getTouchPos(e) - this.startPos;

                if (!this.performanceMode) {
                    this._setTranslate(this.startTranslate + this.delta);
                    this.$emit('slider-move', this._getTranslate());
                }

                //if (this.isVertical() || this.isHorizontal() && Math.abs(this.delta) > 0) {
                //    e.preventDefault();
                //}
            },
            _onTouchEnd(e) {
                this.dragging = false;
                this.transitionDuration = this.speed;
                var isQuickAction = new Date().getTime() - this.startTime < 1000;
                if (this.delta < -100 || (isQuickAction && this.delta < -15)) {
                    this.next();
                } else if (this.delta > 100 || (isQuickAction && this.delta > 15)) {
                    this.prev();
                } else {
                    this._revert();
                }

                document.removeEventListener('touchmove', this._onTouchMove, {passive: true});
                document.removeEventListener('touchend', this._onTouchEnd);
                document.removeEventListener('mousemove', this._onTouchMove);
                document.removeEventListener('mouseup', this._onTouchEnd);
            },
            _onWheel(e) {
                if (this.mousewheelControl) {
                    // TODO Support apple magic mouse and trackpad.
                    if (!this.transitioning) {
                        if (e.deltaY > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    if (this._isPageChanged()) e.preventDefault();

                }
            },
            _revert() {
                this.setPage(this.currentPage);
            },
            _getTouchPos(e) {
                var key = this.isHorizontal() ? 'pageX' : 'pageY';
                return e.changedTouches ? e.changedTouches[0][key] : e[key];
            },
            _onTransitionStart() {
                this.transitioning = true;
                this.transitionDuration = this.speed;
                if (this._isPageChanged()) {
                    this.$emit('slide-change-start', this.currentPage);
                } else {
                    this.$emit('slide-revert-start', this.currentPage);
                }
            },
            _onTransitionEnd() {
                this.transitioning = false;
                this.transitionDuration = 0;
                this.delta = 0;
                if (this._isPageChanged()) {
                    this.$emit('slide-change-end', this.currentPage);
                } else {
                    this.$emit('slide-revert-end', this.currentPage);
                }
            },
            _isPageChanged() {
                return this.lastPage !== this.currentPage;
            },
            _setTranslate(value) {
                var translateName = this.isHorizontal() ? 'translateX' : 'translateY';
                this[translateName] = value;
            },
            _getTranslate(){
                var translateName = this.isHorizontal() ? 'translateX' : 'translateY';
                return this[translateName];
            },
            _getTranslateOfPage(page) {
                if (page === 0) return 0;

                var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight';
                return -[].reduce.call(this.slideEls, function (total, el, i) {
                        return i > page - 2 ? total : total + el[propName];
                    }, 0) + this.translateOffset;
            },
            _createLoop() {
                var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight';
                var swiperWrapEl = this.$refs.wrap;
                var duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true);
                var duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true);
                swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild);
                swiperWrapEl.appendChild(duplicateFirstChild);
                this.translateOffset = -duplicateLastChild[propName];
            }
        }
    };
</script>
