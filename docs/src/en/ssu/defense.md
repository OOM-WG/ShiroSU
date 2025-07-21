---
layout: doc
footer: false
---
# Negative Voices Regarding SakitinSU

## Disclaimer

We do not compete with other `ROOT implementations`, and we are not interested in interpersonal conflicts.
So no matter what others say, we hope you won't mind, and just choose what you want, use what you think is useful.

> `SUU` and `SSU` are sister projects, please distinguish them. `SUU` is named `SuYu`, and SSU is an abbreviation of `SakitinSU`.
> Hereafter referred to as `SSU`.

## Too Many Negative Voices Since SSU Project's Inception

- Suspicions that SSU is a Fork of KernelSU.
- Another KernelSU branch; no comment.
- SSU is a PPT project.
- Hype before the code is even complete.
- If SSU's SU could be written, I wouldn't say anything about it.
- Looks like an empty shell, just using KernelSU's API.

And a series of negative comments. Furthermore, any detailed criticism of a project in the `Preview` stage is meaningless.

## Open Source Statement for SSU Project

The `SSU` project is a subsidiary of `OOM. WG.`. @AnYinSaiTing is the developer for the user space implementation, and @Linso is the developer for the kernel space implementation. The SSU documentation was written by @YumeYuka and optimized collaboratively with other members. As of the end of June, the `SSU` manager has been developed to be usable as a `module manager`. The kernel space implementation's progress is slow due to @Linso's personal reasons.

`SSU` has opened source code for some [configurations](https://github.com/OOM-WG/SakitinSU) and [core components](https://github.com/OOM-WG/WMLang), see <https://github.com/OOM-WG>. The manager's entire code was written by @AnYinSaiTing, and @YumeYuka participated in optimizing a small part of the page. The user space code has completely avoided the `GPL` protocol, including the `WebUI` implementation. The kernel space code was completed by @Linso, and the openness degree is determined by the completeness of @Linso's work. For the documentation part, the documentation uses `vitepress`, and currently only considers opening the article part.

For specific open-source directions, the `SSU` project will mainly open-source more mature frameworks/tools developed during the development process, and opening the core source code is not the primary goal.

The `SSU` interface is developed using third-party libraries. Due to the lack of third-party libraries and issues in some UI bottom layers, SSU's developers are currently unable to resolve them.

## Regarding SSU == KernelSU Fork

> Evaluation: Playing with `KernelSU Next`.

The members of `OOM. WG.` explicitly stated in posts that it is not a `KernelSU` branch. Jumping to conclusions is premature. `SSU` is still under development, and the root implementation needs to wait for the kernel space implementation code's development progress.

Although `SSU` is also a kernel-based root implementation, this does not imply a direct connection between the projects. Overlapping in certain technical implementations is a normal phenomenon, but over-interpreting this overlap is meaningless.

Some people say it's a `KernelSU` API shell, but `KernelSU` does not have any universal APIs. All of `SSU`'s code is for general development targeting various module-based root implementations. Furthermore, `SSU` is primarily a `Kotlin` project, and most of the code is implemented using `Kotlin`'s `JVM/Native`. Only a small portion of the code, which `Kotlin` cannot implement, is implemented in `C++`. While other root implementations mostly use `Kotlin/Java` for application development and `C++/Rust` for user space tools, claiming `SSU` is a `Fork` is purely unfounded.

Moreover, if you follow `SSU`'s historical updates and delve into the specific update content, you will find that `SSU` gradually implemented `SU CLI`, general operations, and general module installations. These are merely preparatory steps for subsequent features, and they are not included in the update logs.

## Conclusion

We will ignore negative voices. `SSU` will be a highly independent implementation, not a pie in the sky. It is expected to achieve kernel space implementation before the end of `July`. Stay tuned.
