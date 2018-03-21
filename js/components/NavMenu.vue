<template>
    <nav id="nav_main" class="section-outer">
        <ul class="nav-elem-wrap">
            <li v-for="term in termTypes"
                class="nav-elem"
                :class="nav_menu == term.term_type?'active':''">
                <h3>
                    <a @click.prevent="activeFilter(term.term_type)">{{ term.term_type_short }}</a>
                </h3>
            </li>
        </ul>
    </nav>
</template>

<script>

    import Bus from '../event/Bus';

    export default {
        data() {
            return {
                nav_menu: 'all'
            }
        },
        props: {
            termTypes : {
                type: Array,
                default: []
            },
        },
        methods: {
            activeFilter(term_type) {
                this.nav_menu = term_type;
                Bus.$emit('filter_category', term_type);
            }
        }

    }
</script>