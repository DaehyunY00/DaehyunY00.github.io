+++
title = "Transformer 논문 실무 관점 리뷰"
date = 2026-02-19T10:00:00+09:00
tags = ["paper-review", "paper", "ai", "nlp", "transformer"]
categories = ["posts"]
summary = "Attention 기반 구조의 핵심 아이디어와 실무 적용 시 고려할 트레이드오프를 정리한다."
draft = false
toc = true
description = "Attention Is All You Need 논문을 실무 적용 관점에서 요약/분석한 리뷰"
aliases = ["/posts/transformer-practical-review/", "/papers/transformer-practical-review/"]
featured = true

paper_title = "Attention Is All You Need"
authors = ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Lukasz Kaiser", "Illia Polosukhin"]
venue = "NeurIPS"
year = 2017
arxiv = "https://arxiv.org/abs/1706.03762"
code = "https://github.com/tensorflow/tensor2tensor"
related_work = ["RNN Seq2Seq", "Bahdanau Attention", "BERT"]
+++

## 1. TL;DR

- 순환 구조 없이 Attention만으로 시퀀스 모델링을 수행한다.
- 병렬 학습이 가능해 학습 효율이 크게 개선된다.
- Self-Attention이 장거리 의존성을 직접 연결한다.
- Multi-Head 구조로 다양한 관계를 동시에 포착한다.
- 위치 정보는 Positional Encoding으로 주입한다.
- 대규모 데이터/연산 자원이 있을수록 강점을 보인다.
- 긴 문맥에서 계산량이 커지는 한계가 있다.
- 이후 BERT/GPT 계열 모델의 기반이 되었다.

## 2. Problem & Motivation

RNN 기반 모델은 시퀀스를 순차적으로 처리하기 때문에 학습 병렬화가 어렵고, 긴 문장에서 정보 전달 경로가 길어지는 문제가 있다. 논문은 이 문제를 완화하기 위해 순환 연산을 제거하고 Attention만으로 인코더/디코더를 구성한다.

## 3. Core Idea

핵심은 Query-Key-Value 매칭으로 토큰 간 관계를 계산하는 것이다.

$$
\text{Attention}(Q, K, V) = \text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V
$$

스케일링 항 \(\\sqrt{d_k}\) 는 내적 값의 분산을 조절해 학습 안정성을 높인다.

## 4. Method

모델은 다음 블록을 반복한다.

1. Multi-Head Self-Attention
2. Position-wise Feed Forward Network
3. Residual Connection + LayerNorm

인코더/디코더 모두 동일한 패턴을 사용하며, 디코더는 미래 토큰을 보지 않도록 마스킹을 적용한다.

## 5. Experiments

| Metric | Baseline (RNN) | Transformer |
| --- | ---: | ---: |
| BLEU (En-De) | 26.3 | 28.4 |
| Training Cost (relative) | 1.00 | 0.65 |

결과는 품질과 학습 효율 두 축에서 모두 개선을 보인다.

## 6. Strengths

- 병렬 처리로 학습 속도를 높일 수 있다.
- 장거리 의존성 모델링이 직관적이다.
- 구조가 모듈화되어 후속 확장이 쉽다.

## 7. Weaknesses

- 입력 길이에 대해 Self-Attention 계산량이 \(O(n^2)\) 으로 증가한다.
- 데이터/연산 자원이 부족한 환경에서는 효율 이점이 제한될 수 있다.

## 8. My Insights

실무에서는 모델 자체 성능보다 추론 비용, 배치 전략, 캐시 정책이 총소유비용(TCO)에 더 큰 영향을 준다. Transformer 채택 시에는 정확도뿐 아니라 latency budget과 서빙 아키텍처를 함께 설계해야 한다.

## 9. Future Work / Questions

- 긴 문맥 처리 비용을 줄이는 attention 변형은 어떤 조건에서 실제 이득이 큰가?
- 모델 압축(quantization/distillation)과 정확도 손실의 균형점은 어디인가?
