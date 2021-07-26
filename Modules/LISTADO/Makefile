ifneq ($(KERNELRELEASE),)
obj-m  := procsdetail_grupo15.o

else
    KDIR ?= /lib/modules/`uname -r`/build

default:
	$(MAKE) -C $(KDIR) M=$$PWD

endif