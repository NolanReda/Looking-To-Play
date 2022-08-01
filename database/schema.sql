set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Users" (
	"userId" serial NOT NULL,
	"regionId" int NOT NULL,
	"timeAvailable" TEXT NOT NULL,
	"recentStats" TEXT,
	"profilePicture" TEXT,
	"username" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gameClients" (
	"clientId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "gameClients_pk" PRIMARY KEY ("clientId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "clientRanks" (
	"clientId" int NOT NULL,
	"rankId" serial NOT NULL,
	"rankName" TEXT NOT NULL,
  UNIQUE ("clientId", "rankId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userRanks" (
	"userId" int NOT NULL,
	"clientId" int NOT NULL,
	"rankId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teamRequests" (
	"senderId" int NOT NULL,
	"recipientId" int NOT NULL,
	"isAccepted" BOOLEAN NOT NULL,
	CONSTRAINT "teamRequests_pk" PRIMARY KEY ("senderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "regionID" (
	"regionId" serial NOT NULL,
	"regionName" TEXT NOT NULL,
  PRIMARY KEY ("regionId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "clientRanks" ADD CONSTRAINT "clientRanks_fk0" FOREIGN KEY ("clientId") REFERENCES "gameClients"("clientId");

ALTER TABLE "userRanks" ADD CONSTRAINT "userRanks_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "userRanks" ADD CONSTRAINT "userRanks_fk1" FOREIGN KEY ("clientId", "rankId") REFERENCES "clientRanks"("clientId", "rankId");

ALTER TABLE "teamRequests" ADD CONSTRAINT "teamRequests_fk0" FOREIGN KEY ("senderId") REFERENCES "Users"("userId");
ALTER TABLE "teamRequests" ADD CONSTRAINT "teamRequests_fk1" FOREIGN KEY ("recipientId") REFERENCES "Users"("userId");

ALTER TABLE "Users" ADD CONSTRAINT "regionID_fk0" FOREIGN KEY ("regionId") REFERENCES "regionID"("regionId");
