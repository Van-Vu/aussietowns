import { mount, shallow, createLocalVue } from "vue-test-utils";
import CardFullComponent from "../../../src/component/shared/listingcard.component.vue";
import { CardType, RepeatedType } from '../../../src/model/enum';
import ScheduleModel from '../../../src/model/schedule.model';
import VueRouter  from "vue-router";

//https://github.com/vuejs/vue-test-utils
//https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
//https://alexjoverm.github.io/2017/09/11/Test-Properties-and-Custom-Events-in-Vue-js-Components-with-Jest/

describe("ListingCardComponent.test.js", () => {
    let wrapper;
    const localVue = createLocalVue();
    const routes = [{name: 'aboutus', path: '/aboutus', component: CardFullComponent},{name: 'listingDetail', path: '/listing', component: CardFullComponent}];
    const router = new VueRouter({
        routes
    });
    localVue.use(router);

    const sampleData = {
        id: 1,
        location: "location",
        header: "header",
        cost: 50,
        primaryOwner: "primaryOwner",
        imageUrls: "imageUrls",
        description: "description",
        tagList: "tagList",
        schedules: new Array(new ScheduleModel('2000/01/01 12:00', '10:00', '10:00', '10:00', RepeatedType.None, ["0"]))
    };

    beforeEach(() => {
        wrapper = shallow(CardFullComponent, {
            localVue,
            router,
            propsData: {
                cardDetail: sampleData,
                cardType: CardType.Listing
            }
        });
    });

    it(".id = 1", () => {
        expect(wrapper.vm.id).toEqual(sampleData.id);
    });

    it(".location = 'location'", () => {
        expect(wrapper.vm.location).toEqual(sampleData.location);
    });

    it(".header = 'header'", () => {
        expect(wrapper.vm.header).toEqual(sampleData.header);
    });

    it(".cost = 50", () => {
        expect(wrapper.vm.cost).toEqual(sampleData.cost);
    });

    it(".owner = 'primaryOwner'", () => {
        expect(wrapper.vm.owner).toEqual(sampleData.primaryOwner);
    });
    
    it(".imageUrls = '[imageUrls]'", () => {
        expect(wrapper.vm.imageUrls).toEqual(["imageUrls"]);
    });

    it(".headerLink = 'header'", () => {
        expect(wrapper.vm.headerLink).toEqual(sampleData.header);
    });

    it(".description = 'description'", () => {
        expect(wrapper.vm.description).toEqual(sampleData.description);
    });

    it(".tagList= 'tagList'", () => {
        expect(wrapper.vm.tagList).toEqual(sampleData.tagList);
    });

    it(".cardLinkTo= object", () => {
        expect(wrapper.vm.cardLinkTo).toEqual({ name: 'listingDetail', path: "/listing", params: { seoString: sampleData.header, listingId: sampleData.id } });
    });

    it(".date= '2000/01/01'", () => {
        expect(wrapper.vm.date).toEqual('01 January 2000');
    });

    it(".time= '12:00'", () => {
        expect(wrapper.vm.time).toEqual('12:00');
    });

    it(".duration= '10:00'", () => {
        expect(wrapper.vm.duration).toEqual('10:00');
    });

    it(".isListingType= true", () => {
        expect(wrapper.vm.isListingType).toEqual(true);
    });
});