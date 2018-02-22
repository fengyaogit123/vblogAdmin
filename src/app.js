/**按需引用 */
import Vue from 'vue'
import 'iview/dist/styles/iview.css';
import iview from 'iview';
import Layout from '@/components/Layout/Layout'
import Block from '@/components/Layout/Block'
import AnimateNumber from './components/AnimateNumber.vue'
import FullScreen from '@/components/fullScreen'
import Search from '@/components/search'
import Editor from '@/components/Editor'
import Upload from '@/components/Upload'
Vue.use(iview);
/**自定义组件 */
Vue.component('FyLayout', Layout)
Vue.component('FyBlock', Block)
Vue.component('AnimateNumber', AnimateNumber)
Vue.component('FullScreen', FullScreen)
Vue.component(Search.name, Search)
Vue.component(Editor.name,Editor)
Vue.component(Upload.name,Upload)
