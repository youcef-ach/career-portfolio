import{S as e}from"./index-M4ZXO7HX.js";import{b as a,a as r,i as o,c as s,d as l}from"./bakedVertexAnimation-ZyQzITbq.js";import{i as c}from"./instancesDeclaration-BYafTMzi.js";import{s as d}from"./sceneUboDeclaration-CyG7FrDt.js";import{c as f,a as S}from"./clipPlaneVertex-B8kylokN.js";import{l as m}from"./logDepthDeclaration-7OLRW07_.js";import{f as x,a as u}from"./fogVertex-B2Qdt-BY.js";import{l as p}from"./lightVxFragmentDeclaration-DJI20Zc0.js";import{l as L,s as V}from"./shadowsVertex-CvE7-MbQ.js";import{l as W}from"./logDepthVertex-D7PmQ87I.js";const t="shadowOnlyVertexShader",n=`attribute position: vec3f;
#ifdef NORMAL
attribute normal: vec3f;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<sceneUboDeclaration>
#ifdef POINTSIZE
uniform pointSize: f32;
#endif
varying vPositionW: vec3f;
#ifdef NORMAL
varying vNormalW: vec3f;
#endif
#ifdef VERTEXCOLOR
varying vColor: vec4f;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying vViewDepth: f32;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
var worldPos: vec4f=finalWorld* vec4f(vertexInputs.position,1.0);vertexOutputs.position=scene.viewProjection*worldPos;vertexOutputs.vPositionW= worldPos.xyz;
#ifdef NORMAL
vertexOutputs.vNormalW=normalize(( finalWorld* vec4f(vertexInputs.normal,0.0)).xyz);
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_MAIN_END
}
`;e.ShadersStoreWGSL[t]||(e.ShadersStoreWGSL[t]=n);const v=[a,r,c,d,f,m,x,p,L,o,s,l,S,W,u,V];for(const i of v)e.IncludesShadersStoreWGSL[i.name]||(e.IncludesShadersStoreWGSL[i.name]=i.shader);const N={name:t,shader:n};export{N as shadowOnlyVertexShaderWGSL};
