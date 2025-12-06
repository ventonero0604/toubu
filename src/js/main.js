import $ from 'jquery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ScrollReveal from 'scrollreveal';

// ハンバーガーメニューの実装
$(document).ready(function () {
  let scrollTop = 0;

  $('.menu').on('click', function () {
    $('.Header').toggleClass('is-open');
    $(this).toggleClass('is-open');

    // ヘッダーのis-openクラスを監視して背景スクロール制御
    if ($('.Header').hasClass('is-open')) {
      // 現在のスクロール位置を保存
      scrollTop = $(window).scrollTop();
      $('body').css('--scroll-top', `-${scrollTop}px`);
      $('body').addClass('no-scroll');
    } else {
      // スクロール位置を復元
      $('body').removeClass('no-scroll');
      $('body').css('--scroll-top', '');
      $(window).scrollTop(scrollTop);
    }
  });

  // ハンバーガーメニュー内のリンクをクリックしたらメニューを閉じる
  $('.Header .expand .details a').on('click', function () {
    if ($('.Header').hasClass('is-open')) {
      $('.Header').removeClass('is-open');
      $('.menu').removeClass('is-open');
      $('body').removeClass('no-scroll');
      $('body').css('--scroll-top', '');
      $(window).scrollTop(scrollTop);
    }
  });

  // アンカーリンクのスムーススクロール（ヘッダー高さ考慮）
  $('a[href^="#"]').on('click', function (e) {
    const href = $(this).attr('href');

    if (href === '#') {
      return;
    }

    e.preventDefault();

    const target = $(href);
    if (target.length) {
      const headerHeight = $('.Header').outerHeight();
      const targetPosition = target.offset().top - headerHeight;

      $('html, body').animate(
        {
          scrollTop: targetPosition
        },
        200
      );
    }
  });

  // モーダルの実装（data-modal -> data-modal-content 対応）
  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    scrollTop = $(window).scrollTop();

    const modalId = $(this).data('modal'); // 1,2,3 など
    const $target = $(`.Modal[data-modal-content="${modalId}"]`);
    if (!$target.length) return;

    // 必要なら他のモーダルは閉じる
    $('.Modal.is-open').not($target).removeClass('is-open');

    $target.addClass('is-open');
    $('body').css('--scroll-top', `-${scrollTop}px`).addClass('no-scroll');
  });

  // 共通のモーダル閉鎖処理
  function closeModal($modal) {
    if (!$modal || !$modal.length) return;
    $modal.removeClass('is-open');
    $('body').removeClass('no-scroll').css('--scroll-top', '');
    $(window).scrollTop(scrollTop);
  }

  // オーバーレイ（モーダル本体）をクリックしたらそのモーダルのみ閉じる
  $(document).on('click', '.Modal', function (e) {
    if (e.target === this) {
      closeModal($(this));
    }
  });

  // モーダル内の閉じるボタン（.js-modal-close）でその親モーダルのみ閉じる
  $(document).on('click', '.js-modal-close', function (e) {
    e.preventDefault();
    const $modal = $(this).closest('.Modal');
    closeModal($modal);
  });

  // ScrollReveal の設定
  const sr = ScrollReveal();
  sr.reveal('.reveal', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    viewFactor: 0.2,
    interval: 100
  });

  // セクションタイトル
  // モーダル内の .SectionTitle は除外して適用
  const sectionTitles = Array.from(document.querySelectorAll('.SectionTitle')).filter(
    el => !el.closest('.Modal')
  );
  if (sectionTitles.length) {
    sr.reveal(sectionTitles, {
      duration: 1000,
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      easing: 'ease-in-out',
      reset: false
    });
  }

  // カード要素
  ScrollReveal().reveal('.Card', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    viewFactor: 0.2,
    interval: 100
  });

  // obj系の画像 - ポップアップ効果
  ScrollReveal().reveal('[class*="obj"]', {
    duration: 600,
    scale: 0.3,
    opacity: 0,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    reset: false,
    viewFactor: 0.1,
    interval: 150,
    delay: 300
  });

  // 出店ブース関連の要素
  ScrollReveal().reveal('.item-booth .title, .item-other .title', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  ScrollReveal().reveal('.item-booth .list, .item-other .list', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    interval: 200
  });

  ScrollReveal().reveal('.item-booth .category', {
    duration: 800,
    distance: '20px',
    origin: 'left',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  ScrollReveal().reveal('.item-booth ul li', {
    duration: 600,
    scale: 0.9,
    opacity: 0,
    easing: 'ease-out',
    reset: false,
    interval: 80
  });

  // マップセクション
  ScrollReveal().reveal('.Map .map', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  ScrollReveal().reveal('.Map .access', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    delay: 200
  });

  // マップセクションの注意事項 - 見出し
  ScrollReveal().reveal('.Map .info .heading', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    delay: 400
  });

  // マップセクションの注意事項 - 各項目
  ScrollReveal().reveal('.Map .info .list li', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false,
    interval: 150,
    delay: 500
  });

  // サブタイトル
  ScrollReveal().reveal('.subTitle', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  // 異なるアニメーションパターン
  ScrollReveal().reveal('.reveal-left', {
    duration: 1000,
    distance: '50px',
    origin: 'left',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  ScrollReveal().reveal('.reveal-right', {
    duration: 1000,
    distance: '50px',
    origin: 'right',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });

  ScrollReveal().reveal('.reveal-fade', {
    duration: 1000,
    distance: '0px',
    opacity: 0,
    easing: 'ease-in-out',
    reset: false
  });
});
