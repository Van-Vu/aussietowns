import { mount, shallow, createLocalVue } from "vue-test-utils";
import MiniProfileComponent from "../../../src/component/shared/miniprofile.component.vue";
import VueRouter  from "vue-router";

//https://github.com/vuejs/vue-test-utils
//https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
//https://alexjoverm.github.io/2017/09/11/Test-Properties-and-Custom-Events-in-Vue-js-Components-with-Jest/

describe("MiniProfileComponent.test.js", () => {
    let wrapper;
    const localVue = createLocalVue();
    const routes = [{name: 'profileHome', path: '/profile', component: MiniProfileComponent}];
    const router = new VueRouter({
        routes
    });
    localVue.use(router);

    const sampleData = {
        id: 1,
        photoUrl: "url",
        fullname: "myfullName",
        isPrimary: true,
        shortDescription: "desc"
    };

    beforeEach(() => {
        wrapper = shallow(MiniProfileComponent, {
            localVue,
            router,
            propsData: {
                data: sampleData,
                isRemovable: false
            }
        });
    });

    it(".userId = 1", () => {
        expect(wrapper.vm.userId).toEqual(1);
    });

    it(".profileImageUrl = 'url'", () => {
        expect(wrapper.vm.profileImageUrl).toEqual("url");
    });

    it(".fullname = 'myfullName'", () => {
        expect(wrapper.vm.fullName).toEqual('myfullName');
    });

    it(".profileLink = 'myfullName'", () => {
        expect(wrapper.vm.profileLink).toEqual('myfullname');
    });

    it(".shortDescription = 'desc'", () => {
        expect(wrapper.vm.shortDescription).toEqual('desc');
    });
    
    it("removeUser event", () => {
        let stub = jest.fn();
        wrapper.vm.$on('removeUser', stub);

        wrapper.vm.onRemoveUser();

        expect(stub).toBeCalledWith(sampleData);
    })

    it("onViewUserProfile event", () => {
        wrapper.vm.onViewUserProfile();

        expect(wrapper.vm.$route.path).toEqual('/profile');        
        expect(wrapper.vm.$route.params).toEqual({ seoString: 'myfullname', profileId: '1' });        
        
    })

    //it("has the expected html structure", () => {
    //    expect(wrapper.vm.$el).toMatchSnapshot();
    //});
});