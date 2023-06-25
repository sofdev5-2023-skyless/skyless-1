<script>
    import { onMount, getContext, createEventDispatcher } from 'svelte';
    import { mount } from './util';
  
    /** @type {import('@stripe/stripe-js').StripeElementClasses} */
    export let classes = {};
  
    /** @type {import('@stripe/stripe-js').StripeElementStyle} */
    export let style = {};
  
    /** @type {string} */
    export let placeholder = 'Card number';
  
    /** @type {boolean?} */
    export let disabled = false;
  
    /** @type {boolean?} */
    export let showIcon = true;
  
    /** @type {'default' | 'solid'} */
    export let iconStyle = 'default';
  
    /** @type {import('@stripe/stripe-js').StripeElementBase?} */
    export let element = null;
  
    /** @type {HTMLElement?} */
    let wrapper;
  
    /** @type {string} */
    export let wrapperClass = '';
  
    const dispatch = createEventDispatcher();
  
    /** @type {import("./types").ElementsContext} */
    const { elements } = getContext('stripe');
  
    onMount(() => {
      const options = { classes, style, placeholder, disabled, showIcon, iconStyle };
  
      element = mount(wrapper, 'cardNumber', elements, dispatch, options);
  
      return () => element.destroy();
    });
  
    export function blur() {
      element.blur();
    }
  
    export function clear() {
      element.clear();
    }
  
    export function destroy() {
      element.destroy();
    }
  
    export function focus() {
      element.focus();
    }
  </script>
  
  <style>
  
    .my-wrapper-class{
      height: 20px;
    }  
    
    .placeholder-text {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      pointer-events: none;
      color: #999;
      font-size: 14px;
      padding: 0 8px;
    }
  </style>
  
  <div bind:this={wrapper} class="{wrapperClass} my-wrapper-class"></div>
  