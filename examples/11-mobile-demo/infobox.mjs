//if(!W['windy-plugin-module-infobox']) W.define(

//    'windy-plugin-module-infobox',
//    [ '$', 'rootScope', 'broadcast','store' ],
//    function ( $, rs, bcast, store ) {


var css=`
.infobox{
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s linear;

    position:absolute;
    margin-left:11px;
    pointer-events:none;
    width:100%;
    background-color:transparent;

    padding:2px;
    line-height:1.1;
    white-space:nowrap

}
.infobox.hide{
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s; opacity 0.5s linear;
}
.infobox .startbutton{
    cursor:pointer;
    pointer-events:auto;
}
`
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

    import rs from '@windy/rootScope';
    import bcast from '@windy/broadcast';
    import $ from '@windy/$';
    import store from '@windy/store';

    let pluginVersion='0.0.8';

    function makeInfoBox(content, startId, _this, hideWhenPluginOpens=false){  //startId = provide plug in element id to show or hide plugin, on clicking box

            const hide=()=>{
                info.classList.add("hide");
            }
            const show=()=>{
                info.classList.remove("hide");
             }


            let info=document.createElement("div");
            info.classList.add("infobox");
            info.innerHTML=content;

            function append2El(e){

                let btm,lft=0;

                 //e=="map"? -10:0;

                if  (rs.isMobile){
                    btm=    e=="capAlerts"?50:
                            e=="map"?40:
                            e=="efiWind"?80:
                            e=="radar"||e=="satellite"?90:
                            e=="fires"?10:
                            140;
                    lft=    e=="map"?-13:0;
                } else if (rs.isTablet){
                    btm=    e=="capAlerts"?50:
                            e=="map"?40://133:
                            e=="efiWind"?110:
                            e=="radar"||e=="satellite"?80:
                            e=="fires"?10:
                            110;
                    lft=    e=="map"?-13:0;
                } else {
                    btm=    e=="capAlerts"?50:
                            e=="map"?40:
                            e=="efiWind"?110:
                            e=="fires"?10:
                            70;
                    lft=    e=="map"?-13:0;
                }

                //wait for DOM element to appear
                let tryAttach=tries=>{
                    let el= e=="satellite"? $("#plugin-satellite"):
                        e=="radar"?     $("#plugin-radar"):
                        e=="efiWind"?   $("#plugin-extreme-forecast"):
                        e=="capAlerts"? $("#plugin-cap-alerts"):
                        e=="map"?       $("[data-ref='opener']",$("#plugin-map-layers")):
                        e=="fires"?     $("#map-container"):
                        rs.isMobile?    $("#mobile-calendar"):$('#bottom');

                    if (el) {
                        if (e=="fires"){
                            info.classList.add("left-border");
                        } else {
                            info.classList.remove("left-border");
                            if (lft) info.style.left=lft+"px";
                        }
                        info.style.bottom=btm+"px";
                        el.appendChild(info);
                    } else if (tries<10) setTimeout(tryAttach,100,tries+1);
                }
                tryAttach(0);
            }

            append2El(store.get("overlay"));

            //this will still happen when plugin no longer active,  preferable,  since if switch back to plugin,  already in right place.
            store.on('overlay',append2El);

            if (startId){
                let start=$("#"+startId,info);
                start.classList.add("startbutton");
                start.addEventListener("click",e=>{
                    e.stopPropagation();
                    bcast.fire('rqstOpen',_this.ident);
                });
            }

            if (hideWhenPluginOpens){  //do not use _this.onopen=()=>{  -----  will overwrite other listeners in main program
                bcast.on("pluginOpened",e=>{if (e==_this.ident)  hide() });
                bcast.on("pluginClosed",e=>{
                    if (e==_this.ident  &&
                        (!_this.active || _this.active() ) //if _this.active() is not defined show,  else if it is defined and the plugin is active,  show.
                    ) show();
                });
            }

            if (typeof _init === 'function') _init();

            return info;
    }

    export default makeInfoBox;

    //return makeInfoBox;

//})