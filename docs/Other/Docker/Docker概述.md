
### **Docker 概述**

**Docker** 是一个开源的  **容器化平台** ，用于开发、部署和运行应用程序。它利用  **操作系统级虚拟化** （容器技术），将应用及其依赖打包成轻量级、可移植的容器，实现  **“一次构建，处处运行”** （Build Once, Run Anywhere）。

---

## **1. Docker 核心概念**

### **(1) 容器（Container）**

* **轻量级虚拟化** ：基于宿主机内核运行，无需完整操作系统，启动快、资源占用低。
* **隔离性** ：每个容器拥有独立的文件系统、网络和进程空间（通过 Linux **cgroups** 和 **namespaces** 实现）。
* **可移植性** ：容器镜像可在任何支持 Docker 的环境中运行（Linux/Windows/macOS）。

### **(2) 镜像（Image）**

* **只读模板** ：包含运行应用所需的代码、库、环境配置（如 Ubuntu + Nginx + Python）。
* **分层存储** ：镜像由多层文件系统叠加而成，共享相同层以节省空间。
* **镜像仓库** ：
* **Docker Hub** （官方公共仓库，如 `nginx:latest`）。
* **私有仓库** （如 Harbor、AWS ECR）。

### **(3) Dockerfile**

* **文本文件** ：定义镜像构建步骤（如基础镜像、安装依赖、复制文件）。
* **示例** ：
  **dockerfile**

```
  FROM ubuntu:22.04
  RUN apt update && apt install -y nginx
  COPY ./index.html /var/www/html/
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
```

---

## **2. Docker 核心优势**

| 特性               | Docker 容器              | 传统虚拟机（VM）      |
| ------------------ | ------------------------ | --------------------- |
| **启动速度** | 秒级启动                 | 分钟级启动            |
| **资源占用** | 共享宿主机内核，占用极低 | 需独立 OS，资源消耗高 |
| **性能**     | 接近原生                 | 有虚拟化开销          |
| **隔离性**   | 进程级隔离               | 完整的系统级隔离      |
| **镜像大小** | 通常为 MB 级             | 通常为 GB 级          |

---

## **3. Docker 典型应用场景**

* **微服务架构** ：每个服务独立容器化，便于扩展和管理（如 Kubernetes 编排）。
* **CI/CD 流水线** ：构建一致的测试/生产环境（如 GitHub Actions + Docker）。
* **开发环境标准化** ：避免“在我机器上能跑”问题（如 `docker-compose` 一键启动 MySQL + Redis）。
* **快速部署应用** ：一键运行复杂应用（如 WordPress、Jenkins）。

---

## **4. Docker 基本命令速查**

| 命令                          | 作用                             |
| ----------------------------- | -------------------------------- |
| `docker run -d nginx`       | 后台运行 Nginx 容器              |
| `docker ps -a`              | 查看所有容器（包括已停止的）     |
| `docker build -t myapp .`   | 根据当前目录 Dockerfile 构建镜像 |
| `docker exec -it <ID> bash` | 进入运行中的容器执行命令         |
| `docker network ls`         | 查看 Docker 网络列表             |

---

## **5. Docker 生态扩展**

* **Docker Compose** ：通过 YAML 文件管理多容器应用（定义服务、网络、卷）。
* **Kubernetes（K8s）** ：容器编排平台，支持自动化部署、扩缩容。
* **Docker Swarm** ：Docker 原生的轻量级集群管理工具。

---

## **总结**

Docker 通过容器化技术解决了 **环境一致性** 和 **依赖冲突** 问题，成为现代 DevOps 的核心工具。其轻量、高效、易迁移的特性，使其在云计算、微服务、自动化测试等领域广泛应用。
