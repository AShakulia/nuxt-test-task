<script setup lang="ts">
import { gsap } from 'gsap';

interface Item {
  photo: string | false;
  name: string;
  place: number;
}

interface Rewars {
  title: string;
  count: number;
}

const items: Item[] = [
  {
    photo: false,
    name: 'Anastasia V has joined the game',
    place: 1
  },
  {
    photo: false,
    name: 'Anastasia V has joined the game',
    place: 1
  },
  {
    photo: false,
    name: 'Anastasia V has joined the game',
    place: 1
  },
];

const rewars: Rewars[] = [
  {
    title: 'reward for new friends',
    count: 12200,
  },
  {
    title: 'reward for friends level-up',
    count: 12200,
  }
]

const isVisibleContent = ref<boolean>(true);
const menuRef = ref<HTMLElement | null>(null);
const isMenuVisible = ref<boolean>(false);

const toggleVisibleContent = (): void => isVisibleContent.value = !isVisibleContent.value;

const toggleMenu = (): void => {
  document.body.style.overflow = 'hidden';

  if (isMenuVisible.value) {
    gsap.to(menuRef.value, {
      y: '100%', 
      opacity: 0,
      duration: 1,
      onComplete: () => {
        isMenuVisible.value = false;
        document.body.style.overflow = '';
      }
    });
  } else {
    isMenuVisible.value = true;

    if (menuRef.value) {
      gsap.fromTo(
        menuRef.value,
        { y: '100%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: 1,
          onComplete: () => {
            document.body.style.overflow = '';
          }
        }
      );
    }
  }
};
</script>

<template>
  <div class="invite">
    <div class="invite__wrapper">
      <h2 class="invite__wrapper-title">invite friends!</h2>
      <p class="invite__wrapper-subtitle">You and your friend will receive bonuses!</p>
    </div>
    <div class="invite__present">
        <img class="invite__present-img--big" src="../assets/images/present.svg"/>
      <div class="invite__present-wrapper">
        <h3 class="invite__present-title">Invite friend</h3>
        <div class="invite__present-subtitle">
          <img class="invite__present-img--small" src="../assets/images/money.png"/>
          <span class="invite__present-amount">500</span>
          <span class="invite__present-text">For you and your friends</span>
        </div>
      </div>
    </div>
    <button class="invite-btn--bonus">
      MORE BONUSES!
    </button>
    <button class="invite-btn--referal">
      <span class="invite-btn__text">YOUR REFERAL LINK</span>
      <img class="invite-btn__img" src="../assets/images/link.svg"/>
    </button>
    <div class="invite__list">
      <div class="invite__list-wrapper">
        <h3 class="invite__list-title">List of your friends</h3>
        <img class="invite__list-img" src="../assets/images/union.svg" @click="toggleVisibleContent">
      </div>
      <button class="invite-btn--claim" @click="toggleMenu">
        Claim all rewards
      </button>
      <div class="invite__list-content" v-if="isVisibleContent">
        <ul class="invite__list-items">
          <li v-for="(item, index) in items" :key="index" class="invite__list-item">
            <img v-if="item.photo" :src="item.photo" class="invite__list-item-photo" />
            <img v-else src="../assets/images/photo-none.png" class="invite__list-item-photo" />
            <span class="invite__list-item-name">{{ item.name }}</span>
            <img class="invite__list-item-img" src="../assets/images/medal.svg" />
            <span class="invite__list-item-place">Place: {{ item.place }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-show="isMenuVisible" class="invite__menu" ref="menuRef">
    <div class="invite__menu-wrapper">
      <button class="invite-btn--close">
        <img src="../assets/images/close.svg" @click="toggleMenu"/>
      </button>
    </div>
    <h3 class="invite__menu-title">Claim your rewars</h3>
    <img class="invite__menu-img" src="../assets/images/menu-image.svg"/>
    <div class="invite__menu-content">
      <ul class="invite__menu-items">
        <li class="invite__menu-item" v-for="(reward, index) in rewars" :key="index">
          <p class="invite__menu-item-name">{{ reward.title }}</p>
          <img class="invite__menu-item-img" src="../assets/images/money.png" />
          <p class="invite__menu-item-place">Place: {{ reward.count }}</p>
        </li>
      </ul>
    </div>
    <button class="invite-btn--menu">Claim</button>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.invite {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 7px 0;
  margin: 0 auto;

  &__wrapper {
    padding: 0 22px;
    margin-bottom: 14px;

    &-title {
      height: 21px;
      color: $main-text-color;
      text-align: center;
      text-shadow: 0px 2px 0px #000;
      font-family: $main-font-family;
      font-size: 24px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      text-transform: uppercase;
    }

    &-subtitle {
      height: 17px;
      color: $ligth-text-color;
      text-align: center;
      text-shadow: 0px 1px 0px #000;
      font-family: $spare-font-family;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }

  &__present {
    width: 100%;
    background: linear-gradient(90deg, rgba(48, 129, 180, 0.00) 0%, #215789 34.03%, #215789 78.06%, rgba(25, 72, 140, 0.00) 100%);
    display: flex;
    justify-content: space-around;
    padding: 4px 0;
    margin-bottom: 14px;

    &-img--big {
      display: block;
      width: 48px;
      height: 44px;
    }

    &-wrapper {
      height: 40px;
    }

    &-title {
      height: 20px;
      color: $main-text-color;
      text-shadow: 0px 0.579px 0px #000;
      font-family: $main-font-family;
      font-size: 14px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    &-subtitle {
    display: flex;
    align-items: center;
    height: 16px;
    }

    &-img--small {
      display: block;
      height: 16px;
      width: 16px;
      margin-right: 4px;
    }

    &-amount {
      text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
      font-family: $main-font-family;
      font-size: 12px;
      font-style: normal;
      font-weight: 900;
      line-height: 12px; 
      color: $ligth-text-color;
      margin-right: 12px;
    }

    &-text {
      color: $ligth-text-color;
      text-shadow: 0px 0.579px 0px #000;
      font-family: $spare-font-family;
      font-size: 12px;
      font-style: normal;
      font-weight: 900;
      line-height: 12px; 
    }
  }

  &-btn {

    &--bonus {
      width: 100%;
      color: $bright-btn-color;
      height: 36px;
      border-radius: 18px;
      border: 2px solid $border-btn-color;
      background: linear-gradient(90deg, #134381 0%, #1E5EA3 48.5%, #134381 100%);
      box-shadow: 0px 1px 10px 0px rgba(125, 208, 255, 0.50);
      text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
      font-family: $main-font-family;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      line-height: 36px;
      margin-bottom: 12px;
    }

    &--referal {
      width: 100%;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      border: 2px solid $border-btn-color;
      background: linear-gradient(90deg, #134381 0%, #1E5EA3 48.5%, #134381 100%);
      box-shadow: 0px 1px 10px 0px rgba(125, 208, 255, 0.50);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 16px;
    }

    &--claim {
      width: 302px;
      height: 40px;
      border-radius: 18px;
      background: linear-gradient(180deg, #FACF45 0%, #D5A512 100%);
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25), 0px 2px 0px 0px #FFEEBA inset, 0px -2px 0px 0px #7A5D00 inset;
      color: $ligth-text-color;
      text-align: center;
      text-shadow: 0px 0.5px 0px #1F1F1F;
      font-family: $main-font-family;
      font-size: 24px;
      font-style: normal;
      font-weight: 900;
      line-height: 40px;
      text-transform: uppercase;
      margin: 0 auto;
      display: block;
    }

    &--menu {
      border-radius: 18px;
      background: linear-gradient(180deg, #FACF45 0%, #D5A512 100%);
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25), 0px 2px 0px 0px #FFEEBA inset, 0px -2px 0px 0px #7A5D00 inset;
      color: $ligth-text-color;
      text-align: center;
      text-shadow: 0px 0.5px 0px #1F1F1F;
      font-family: $main-font-family;
      font-size: 24px;
      font-style: normal;
      font-weight: 900;
      line-height: 20px;
      text-transform: uppercase;
      height: 40px;
      width: 140px;
      margin: 0 auto;
      display: block;
    }

    &--close {
      width: 28px;
      height: 28px;
      filter: drop-shadow(0px 4px 0px #00070D) drop-shadow(0px 0px 9.4px #3583BE);
      all: unset;
      border: none;
      background: transparent;
      margin-left: auto;
    }

    &__text {
      color: $white-text-color;
      text-align: center;
      text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
      -webkit-text-stroke-width: 0.5;
      -webkit-text-stroke-color: var(--stroke-counter, #000);
      font-family: $main-font-family;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      margin-right: 25px;
    }

    &__img {
      width: 18px;
      height: 20px;
    }
  }

  &__list {

    &-wrapper {
      padding: 0 58.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      margin-bottom: 4px;
    }

    &-title {
      color: $ligth-text-color;
      text-align: center;
      text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
      font-family: $spare-font-family;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
    }

    &-img {
      width: 20px;
      height: 20px;
    }

    &-content {
      margin-top: 4px;
      border-radius: 12px;
      border-right: 1px solid #3579B5;
      border-bottom: 1px solid #3579B5;
      border-left: 1px solid #3579B5;
      background: radial-gradient(51.09% 70.69% at 50% 52.89%, #3081B4 0%, #19488C 100%);
      box-shadow: 0px 4px 4.5px 0px rgba(0, 3, 6, 0.50) inset;
    }

    &-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    &-item {
      display: flex;
      max-height: 440px;
      padding: var(--Colums, 6px) 4px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-bottom: 1px solid rgba(167, 222, 253, 0.00);
      background: radial-gradient(51.09% 70.69% at 50% 52.89%, #3081B4 0%, #19488C 100%);

      &-photo {
        width: 30px;
        height: 30px;
        background-color: #15376C;
        border-radius: 4px;
      }

      &-name {
        color: $ligth-text-color;
        text-shadow: 0px 0.579px 0px #000;
        -webkit-text-stroke-width: 0.28973597288131714;
        font-family: $spare-font-family;
        font-size: 10px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }

      &-medal {
        width: 28px;
        height: 26px;
      }

      &-place {
        color: #FFF;
        text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
        font-family: $spare-font-family;
        font-size: 16px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }
    }
  }

  &__menu {
  width: 100%;
  height: 66.5vh;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 20;
  border-radius: 21px 21px 0px 0px;
  background: var(--Pop-up-fill, linear-gradient(180deg, #124682 0%, #0F2C5B 100%));
  box-shadow: 0px -10px 30px 0px #113E76, 0px 30px 20.7px 0px rgba(0, 0, 0, 0.25) inset, 0px 3px 0px 0px #63ADED inset;

    &-wrapper {
      display: flex;
      justify-content: flex-end;
      height: 28px;
    }

    &-title {
      color: #FFD144;
      text-align: center;
      font-family: "Changa One";
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
      height: 30px;
      margin-bottom: 10px;
    }

    &-img {
      width: 100%;
      height: 192px;
      margin-bottom: 27px;
    }

    &-items {
      margin-bottom: 27px;
    }

    &-item {
      display: flex;
      height: 20px;
      padding: 0px 12px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      
      &:not(:last-child) {
      margin-bottom: 8px;
      }

      &-name {
        color: $ligth-text-color;
        text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.50);
        font-family: $spare-font-family;
        font-size: 12px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        text-transform: uppercase;
        width: 200px;
        height: 20px;
        text-align: left;
      }

      &-place {
        color: $ligth-text-color;
        text-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.50);
        font-family: $main-font-family;
        font-size: 14px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }
    }
  }
}
</style>