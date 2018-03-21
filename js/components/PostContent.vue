<template>
    <div  class="mc-node cf">
        <div class="header">
            <h2 class="title title-node">Data</h2>
            <p class="desc">
                Included below are a selection of useful development related terms and concepts. This application allows users to filter these terms/concepts by type.
            </p>
        </div>
        <template v-for="post_data in postDatas">
            <div v-if="filter_term == post_data.data.main.term_type.toLowerCase().trim() || filter_term == 'all'"
             id="data_wrap" class="body cf">
            <div class="data-item">
                <div class="header">
                    <div :class="'accent-'+post_data.data.main.term_type.toLowerCase().trim()">
                        <h4 class="data-type">{{ post_data.data.main.term_type }}</h4>
                    </div>
                    <div class="header-text">
                        <p class="data-text data-text-preview">
                            <span class="data-term" :class="'data-term-'+post_data.data.main.term_type.toLowerCase().trim()" v-html="post_data.data.main.term"></span>
                            <span class="">{{ post_data.data.main.desc.preview }}</span>
                        </p>
                    </div>
                </div>
                <div class="body">
                    <p class="data-text data-text-main">
                        {{ post_data.data.main.desc.main }}
                    </p>
                </div>
            </div>
        </div>
        </template>

    </div>
</template>

<script>
    import Bus from '../event/Bus';

    export default {
        data() {
            return {
                filter_term: 'all'
            }
        },
        props: {
            postDatas : {
                type: Array,
                default: []
            },
        },

        mounted() {
            Bus.$on('filter_category', (data) =>  {
                this.filter_term = data;
            });
        }

    }
</script>