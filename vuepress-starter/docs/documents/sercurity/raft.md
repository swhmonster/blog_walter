## Raft
### Raft Overview
RAFT is a consistency algorithm used to ensure the consistency of data replicas in distributed systems. The RAFT algorithm was proposed by Diego Ongaro and John Ousterhout in 2014 and has been widely applied in the field of distributed systems.

The RAFT algorithm is simple and easy to understand, easy to implement and debug, and has significant advantages compared to other consistency algorithms. Its main idea is to decompose the consistency problem into several smaller problems, such as leader election, log copy and security. The RAFT algorithm ensures data consistency by using leaders to coordinate operations between multiple nodes.

The core of the RAFT algorithm is communication between nodes and replication of state machines. Communication between nodes is achieved by sending RPC messages, and the replication of state machines is achieved through the replication of logs. When a node becomes the leader, it is responsible for receiving client requests, converting them into log records, and copying the logs to the state machines of other nodes. When a node receives a log, it records the log in the local log and adds the record to the state machine.

The advantage of RAFT algorithm is lightweight, easy to implement and maintain. Compared with other consistency algorithms, the RAFT algorithm also performs very well. Due to its adoption of a leader style approach to coordinate operations between nodes, the RAFT algorithm performs better than the Paxos algorithm when the number of nodes is small. In addition, the readability and comprehensibility of the RAFT algorithm are also very good, making it very suitable for teaching and popularization.

Overall, the RAFT algorithm is a lightweight, easy to implement and maintain consistency algorithm, widely used in distributed systems. It coordinates operations between nodes through leaders, ensuring data consistency while also having good readability and comprehensibility.
### Go deeper
The core design idea of the RAFT algorithm is to decompose the consistency problem into several smaller sub problems, and by solving these sub problems separately, ultimately achieving the consistency of the entire system. Specifically, RAFT decomposes the consistency problem into three sub problems: leader election, log replication, and security.
#### Leader election
In the RAFT algorithm, the leader is the key to coordinating operations between multiple nodes. Each node can become a leader, but only one node can become a leader at a time. When a leader experiences a malfunction or network partitioning, a new leader needs to be elected.

**The process of leader election is as follows:**
1. All nodes randomly wait for a period of time before becoming candidates and sending voting requests to other nodes.
2. The node that receives the voting request will vote for the candidate and update its term number to the candidate's term number. 
3. If a candidate receives votes from most nodes, it will become the new leader and send heartbeat information to all nodes to prove that it is the current leader.
#### Log replication
In the RAFT algorithm, each node has its own log record. The leader is responsible for receiving client requests and converting them into log records. Then, the leader sends the log record to all nodes, requesting them to add the record to the local log.

When a node receives a log, it records the log in the local log and adds the record to the state machine. The log replication between nodes adopts a majority mechanism similar to the Paxos algorithm to ensure data consistency.
#### Security
In the RAFT algorithm, security refers to the security of log replication between nodes. In order to ensure security, the RAFT algorithm adopts basic security attributes similar to those in the Paxos algorithm: only after most dispatch nodes record the log to the local log, can this record be considered a valid record.

In addition to basic security attributes, the RAFT algorithm also adopts some other security mechanisms, such as snapshot and log compression. A snapshot refers to saving a snapshot of the current state in the state machine for recovery after a node failure. Log compression refers to the periodic deletion of submitted log records to reduce storage and network transmission costs.

In general, RAFT algorithm decomposes the consistency problem into several smaller sub problems, and uses mechanisms such as leader election, log replication, and security to solve these sub problems, so as to achieve the consistency of the entire system. Compared with other consistency algorithms, RAFT algorithm has the advantages of lightweight, easy implementation and maintenance, and has been widely used in distributed systems.