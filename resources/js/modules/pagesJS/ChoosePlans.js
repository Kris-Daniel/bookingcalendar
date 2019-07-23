export default class ChoosePlans{
    constructor() {
        $(document).ready(() => {
            this.setPlans();
        });
    }
    setPlans() {
        $('section.plan-page').each(function(index, item){
            new Plan(item);
        });
    }
}

class Plan{
    constructor(plan){
        this.$plan = $(plan);

        this.setClicks();
        this.setClicksPlan();
        this.features();
    }
    setClicks(){
        this.$plan.find('.plan-btn-month').each((index, item) =>{
            let $btn = $(item);
            $btn.click(() =>{
                this.$plan.find('.price-year').hide();
                this.$plan.find('.plan-price .price-month').fadeIn(1000);
                this.$plan.find('.plan-btn-month').addClass('cyan_bg');
                this.$plan.find('.plan-btn-annual').removeClass('cyan_bg');
                this.$plan.find('.plan-btn-month a span').addClass('white');
                this.$plan.find('.plan-btn-annual a span').removeClass('white');
                this.$plan.find('a.plan-btn-month span').addClass('cyan');
                this.$plan.find('a.plan-btn-annual span').removeClass('cyan');
            });
        });
        this.$plan.find('.plan-btn-annual').each((index, item) =>{
            let $btn = $(item);
            $btn.click(() =>{
                this.$plan.find('.plan-price .price-month').hide();
                this.$plan.find('.plan-price .price-year').fadeIn(1000);
                this.$plan.find('.plan-btn-month').removeClass('cyan_bg');
                this.$plan.find('.plan-btn-annual').addClass('cyan_bg');
                this.$plan.find('.plan-btn-month a span').removeClass('white');
                this.$plan.find('.plan-btn-annual a span').addClass('white');
                this.$plan.find('a.plan-btn-month span').removeClass('cyan');
                this.$plan.find('a.plan-btn-annual span').addClass('cyan');
            });
        });
    }
    setClicksPlan(){
        let count = 2;
        let planLength = this.$plan.find('.plan-plans td').length;
        this.$plan.find('table').each((index, item) =>{
            let $table = $(item);
            this.$plan.find('.btn-back').click(() =>{
                count++;
                if(count > planLength){
                    count = 2
                }
                $table.attr('data-id', count);
            });
            this.$plan.find('.btn-next').click(() =>{
                count--;
                if(count < 2){
                    count = planLength
                }
                $table.attr('data-id', count);
            });
        });
    }
    features(){
        this.$plan.find('.features').click(() =>{
            // this.$plan.find('tbody').fadeToggle( 500, "linear" );
            this.$plan.find('tbody').toggle;
            this.$plan.find('.features').toggleClass('features-media')
        })
    }
}