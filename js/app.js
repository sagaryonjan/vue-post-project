import Vue   from 'vue';
import axios from 'axios';
import NavMenu from './components/NavMenu.vue';
import PostContent from './components/PostContent.vue';

new Vue({
   el: '#app',
   data: {
       post_datas: [],
       term_types: [],
   },
   components : {
       NavMenu,
       PostContent
   },
   methods : {
       getJsonData() {
           axios('data/data.json').then((response) => {
               this.post_datas = response.data;

               this.term_types.push({
                   term_type: 'all',
                   term_type_short: 'All',
                   number: this.post_datas.length
               });

               this.post_datas.map( (post_data) => {
                   let term_type = post_data.data.main.term_type;
                   let lower_term_type = term_type.toLowerCase().trim();

                   this.updateTermTypes(post_data, lower_term_type);
               });
           });
       },
       updateTermTypes(post_data, lower_term_type) {

           let term_type = this.checkUniqueTermTypes(lower_term_type);
           if(Object.keys(term_type).length === 0) {
               this.term_types.push({
                   term_type: lower_term_type,
                   term_type_short: post_data.data.main.term_type_short,
                   number: 1
               });
           } else {
               this.term_types.push({
                   term_type: lower_term_type,
                   term_type_short: post_data.data.main.term_type_short,
                   number: term_type.number + 1
               });
               this.term_types.splice(term_type.index, 1);
           }

       },
       checkUniqueTermTypes(lower_term_type) {
           let term_type = {};

           this.term_types.map((data, index) => {
               if(data.term_type == lower_term_type) {
                   term_type = data;
                   term_type.index = index
               }
           });

           return term_type;
       }
   },
   mounted() {
       this.getJsonData();
   }
});